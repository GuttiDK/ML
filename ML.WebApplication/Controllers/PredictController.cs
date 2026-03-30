using Microsoft.AspNetCore.Mvc;
using MLConsoleApp;

namespace ML.WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PredictController : ControllerBase
    {
        [HttpGet(Name = "Predict")]
        public async IEnumerable<PredictionEnginePool<MLModel1.ModelInput, MLModel1.ModelOutput>> Predict(string input)
        {
            await Task.FromResult(predictionEnginePool.Predict(input));
        }
    }
}
