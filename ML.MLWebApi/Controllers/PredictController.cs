using Microsoft.AspNetCore.Mvc;
using ML.MLWebApi.Services;
using static ML_MLTraining.MLModel1;

namespace ML.MLWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PredictController(IPredictService predictService) : ControllerBase
    {
        private readonly IPredictService _predictService = predictService;

        [HttpGet]
        [ProducesResponseType(typeof(ModelOutput), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> PredictToxicComment([FromQuery] string message)
        {
            if (string.IsNullOrWhiteSpace(message))
            {
                return BadRequest("Message cannot be empty");
            }

            var result = await _predictService.PredictToxicCommentAsync(message);
            return Ok(result);
        }
    }
}
