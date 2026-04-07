namespace ML.MLWebApi.DTOs;

public class PredictionResultDto<TResult>
{
    public TResult PredictedValue { get; set; } = default!;

    /// <summary>
    /// For classification: sandsynligheder per klasse.
    /// For regression: null.
    /// </summary>
    public Dictionary<string, float>? Scores { get; set; }

    public string ModelName { get; set; } = string.Empty;
}