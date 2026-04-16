using ML.MLWebApi.Dtos;

namespace ML.MLWebApi.Services;

public interface IMLPredictionService<TInput, TOutput, TResult>
    where TInput : class, new()
    where TOutput : class, new()
{
    TResult Predict(StudentInputDto input);

    PredictionResultDto<TResult> PredictWithDetails(StudentInputDto input);
}