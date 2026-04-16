namespace ML.MLWebApi.Dtos;

public class PredictionResultDto<TResult>
{
    private Dictionary<string, float> scores;

    public TResult PredictedValue { get; set; } = default!;

    /// <summary>
    /// For classification: sandsynligheder per klasse.
    /// For regression: null.
    /// </summary>
    public Dictionary<string, float> Scores { get => scores; set => scores=value; }

    public string ModelName { get; set; } = string.Empty;
}