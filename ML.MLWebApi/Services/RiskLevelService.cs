using Microsoft.ML;
using ML.MLWebApi.Dtos;
using ML.MLWebApi.DTOs;
using ML_MLTraining;

namespace ML.MLWebApi.Services;

/// <summary>
/// Forudsiger risk_level (Low / Medium / High) — Classification model.
/// </summary>
public class RiskLevelService : IMLPredictionService<
    MLRiskLevel.ModelInput,
    MLRiskLevel.ModelOutput,
    string>
{
    private readonly PredictionEngine<MLRiskLevel.ModelInput, MLRiskLevel.ModelOutput> _engine;

    public RiskLevelService(MLContext mlContext, string modelPath)
    {
        var model = mlContext.Model.Load(modelPath, out _);
        _engine = mlContext.Model.CreatePredictionEngine<
            MLRiskLevel.ModelInput,
            MLRiskLevel.ModelOutput>(model);
    }

    public string Predict(StudentInputDto input)
        => _engine.Predict(MapInput(input)).PredictedLabel;

    public PredictionResultDto<string> PredictWithDetails(StudentInputDto input)
    {
        var output = _engine.Predict(MapInput(input));

        // Prepare variable for annotation retrieval (GetValue requires ref parameter).
        ReadOnlyMemory<char>[] keys = null;
        try
        {
            var scoreColumn = _engine.OutputSchema["Score"];
            // GetValue<T> has signature GetValue<T>(string kind, ref T value)
            scoreColumn.Annotations.GetValue("KeyValues", ref keys);
        }
        catch
        {
            // If annotation isn't present or retrieval fails, leave keys as null.
            keys = null;
        }

        return new PredictionResultDto<string>
        {
            PredictedValue = output.PredictedLabel,
            ModelName = "RiskLevel",
            Scores = output.Score != null && keys != null
                ? keys.Select((k, i) => (Key: k.ToString(), Val: output.Score[i]))
                      .ToDictionary(x => x.Key, x => x.Val)
                : null
        };
    }

    private static MLRiskLevel.ModelInput MapInput(StudentInputDto dto) => new()
    {
        Age = dto.Age,
        Gender = dto.Gender,
        Academic_year = dto.AcademicYear,
        Study_hours_per_day = dto.StudyHoursPerDay,
        Exam_pressure = dto.ExamPressure,
        Academic_performance = dto.AcademicPerformance,
        Stress_level = dto.StressLevel,
        Anxiety_score = dto.AnxietyScore,
        Depression_score = dto.DepressionScore,
        Sleep_hours = dto.SleepHours,
        Physical_activity = dto.PhysicalActivity,
        Social_support = dto.SocialSupport,
        Screen_time = dto.ScreenTime,
        Internet_usage = dto.InternetUsage,
        Financial_stress = dto.FinancialStress,
        Family_expectation = dto.FamilyExpectation
    };
}