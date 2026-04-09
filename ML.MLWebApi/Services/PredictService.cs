using Microsoft.Extensions.ML;
using static ML_MLTraining.MLModel1;

namespace ML.MLWebApi.Services
{
    public interface IPredictService
    {
        Task<ModelOutput> PredictToxicCommentAsync(string message);
    }
    public class PredictService(PredictionEnginePool<ML_MLTraining.MLModel1.ModelInput, ML_MLTraining.MLModel1.ModelOutput> predictionEnginePool) : IPredictService
    {
        private readonly PredictionEnginePool<ModelInput, ModelOutput> _predictionEnginePool = predictionEnginePool;

        public async Task<ModelOutput> PredictToxicCommentAsync(string message)
        {
            //Load sample data
            var sampleData = new ModelInput()
            {
                Tweet = message
            };

            //Load model and predict output
            var result = await Task.Run(() => _predictionEnginePool.Predict(sampleData));
            return result;
        }
    }
}
