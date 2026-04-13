using ML.MLWebApi.Dtos;

namespace ML.MLWebApi.Services;

/// <summary>
/// Generic ML service interface for all student health prediction models.
/// TInput = input model type (ML.NET generated ModelInput)
/// TOutput = output model type (ML.NET generated ModelOutput)
/// TResult = the final prediction result type (string or float)
/// </summary>
public interface IMLPredictionService<TInput, TOutput, TResult>
    where TInput : class, new()
    where TOutput : class, new()
{
    /// <summary>
    /// Kør en enkelt forudsigelse baseret på student input.
    /// </summary>
    TResult Predict(StudentInputDto input);

    /// <summary>
    /// Kør forudsigelse og returnér både label og score/sandsynlighed.
    /// </summary>
    PredictionResultDto<TResult> PredictWithDetails(StudentInputDto input);
}