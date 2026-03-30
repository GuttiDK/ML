import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme, useTheme } from "@/context/theme-context";
import { useThemeColor } from "@/hooks/use-theme-color";

interface ModelOutput {
  label: boolean;
  tweet: number[];
  features: number[];
  predictedLabel: boolean;
  score: number;
  probability: number;
}

export default function PredictScreen() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ModelOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme();
  const { toggleTheme, themeMode } = useTheme();
  const buttonTextColor = colorScheme === "dark" ? "#000" : "#fff";

  const handlePredict = async () => {
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `http://192.168.1.128:50731/Predict?message=${encodeURIComponent(message)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data: ModelOutput = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              ML Prediction
            </ThemedText>
            <Pressable
              style={[styles.themeToggle, { borderColor: tintColor }]}
              onPress={toggleTheme}
            >
              <Text style={{ fontSize: 20 }}>
                {colorScheme === "dark" ? "☀️" : "🌙"}
              </Text>
            </Pressable>
          </ThemedView>

          <ThemedText style={styles.description}>
            Enter a message to get a prediction from the ML model.
          </ThemedText>

          <TextInput
            style={[
              styles.input,
              {
                color: textColor,
                borderColor: tintColor,
                backgroundColor: backgroundColor,
              },
            ]}
            placeholder="Enter your message..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: tintColor },
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handlePredict}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={buttonTextColor} />
            ) : (
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                Predict
              </Text>
            )}
          </Pressable>

          {error && (
            <ThemedView style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </ThemedView>
          )}

          {result && (
            <ThemedView style={styles.resultContainer}>
              <ThemedText type="subtitle" style={styles.resultTitle}>
                Result
              </ThemedText>

              <ThemedView style={styles.resultRow}>
                <ThemedText type="defaultSemiBold">Predicted Label:</ThemedText>
                <ThemedView
                  style={[
                    styles.labelBadge,
                    {
                      backgroundColor: result.predictedLabel
                        ? "#22c55e"
                        : "#ef4444",
                    },
                  ]}
                >
                  <ThemedText style={styles.labelText}>
                    {result.predictedLabel ? "True" : "False"}
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedView style={styles.resultRow}>
                <ThemedText type="defaultSemiBold">Score:</ThemedText>
                <ThemedText>{result.score?.toFixed(4) ?? "N/A"}</ThemedText>
              </ThemedView>

              <ThemedView style={styles.resultRow}>
                <ThemedText type="defaultSemiBold">Probability:</ThemedText>
                <ThemedText>
                  {result.probability != null
                    ? `${(result.probability * 100).toFixed(2)}%`
                    : "N/A"}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.progressBarContainer}>
                <ThemedView
                  style={[
                    styles.progressBar,
                    {
                      width: `${(result.probability ?? 0) * 100}%`,
                      backgroundColor: result.predictedLabel
                        ? "#22c55e"
                        : "#ef4444",
                    },
                  ]}
                />
              </ThemedView>

              <ThemedView style={styles.resultRow}>
                <ThemedText type="defaultSemiBold">Label:</ThemedText>
                <ThemedText>{result.label ? "True" : "False"}</ThemedText>
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    marginBottom: 0,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginBottom: 24,
    opacity: 0.8,
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  errorContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
  },
  resultContainer: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.3)",
  },
  resultTitle: {
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.2)",
  },
  labelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  labelText: {
    color: "#fff",
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(128, 128, 128, 0.2)",
    borderRadius: 4,
    marginVertical: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
});
