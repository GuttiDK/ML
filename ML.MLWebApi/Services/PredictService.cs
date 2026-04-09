using Microsoft.Extensions.ML;
using ML_MLTraining;

namespace ML.MLWebApi.Services
{
    public interface IPredictService
    {
        Task<MLModel1.ModelOutput> PredictToxicCommentAsync(string message);
    }
    public class PredictService(PredictionEnginePool<MLModel1.ModelInput, MLModel1.ModelOutput> predictionEnginePool) : IPredictService
    {
        private readonly PredictionEnginePool<MLModel1.ModelInput, MLModel1.ModelOutput> _predictionEnginePool = predictionEnginePool;

        public async Task<MLModel1.ModelOutput> PredictToxicCommentAsync(string message)
        {
            //Load sample data
            var sampleData = new MLModel1.ModelInput()
            {
                Tweet = message
            };

            //Load model and predict output
            var result = await Task.Run(() => _predictionEnginePool.Predict(sampleData));
            return result;
        }
    }
}
