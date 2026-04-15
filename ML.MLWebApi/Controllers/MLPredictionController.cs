using Microsoft.AspNetCore.Mvc;
using ML.MLWebApi.Dtos;
using ML.MLWebApi.Services;
using ML_MLTraining;

namespace ML.MLWebApi.Controllers;

[ApiController]
[Route("api/ml")]
public class MLPredictionController(
    IMLPredictionService<
            MLBurnoutScore.ModelInput,
            MLBurnoutScore.ModelOutput,
            float> burnoutScore,
    IMLPredictionService<
            MLMentalHealth.ModelInput,
            MLMentalHealth.ModelOutput,
            float> mentalHealth,
    IMLPredictionService<
            MLDropoutRisk.ModelInput,
            MLDropoutRisk.ModelOutput,
            float> dropoutRisk) : ControllerBase
{

    private readonly IMLPredictionService<
        MLBurnoutScore.ModelInput,
        MLBurnoutScore.ModelOutput,
        float> _burnoutScore = burnoutScore;

    private readonly IMLPredictionService<
        MLMentalHealth.ModelInput,
        MLMentalHealth.ModelOutput,
        float> _mentalHealth = mentalHealth;

    private readonly IMLPredictionService<
        MLDropoutRisk.ModelInput,
        MLDropoutRisk.ModelOutput,
        float> _dropoutRisk = dropoutRisk;

    [HttpPost("burnoutscore/predict")]
    [ProducesResponseType(typeof(PredictionResultDto<float>), StatusCodes.Status200OK)]
    public IActionResult PredictBurnoutScore([FromBody] StudentInputDto input)
        => Ok(_burnoutScore.PredictWithDetails(input));

    [HttpPost("mentalhealth/predict")]
    [ProducesResponseType(typeof(PredictionResultDto<float>), StatusCodes.Status200OK)]
    public IActionResult PredictMentalHealth([FromBody] StudentInputDto input)
        => Ok(_mentalHealth.PredictWithDetails(input));

    [HttpPost("dropoutrisk/predict")]
    [ProducesResponseType(typeof(PredictionResultDto<float>), StatusCodes.Status200OK)]
    public IActionResult PredictDropoutRisk([FromBody] StudentInputDto input)
        => Ok(_dropoutRisk.PredictWithDetails(input));


    [HttpPost("predict/all")]
    [ProducesResponseType(typeof(AllPredictionsDto), StatusCodes.Status200OK)]
    public IActionResult PredictAll([FromBody] StudentInputDto input)
    {
        return Ok(new AllPredictionsDto
        {
            BurnoutScore = _burnoutScore.PredictWithDetails(input),
            MentalHealth = _mentalHealth.PredictWithDetails(input),
            DropoutRisk = _dropoutRisk.PredictWithDetails(input)
        });
    }
}
