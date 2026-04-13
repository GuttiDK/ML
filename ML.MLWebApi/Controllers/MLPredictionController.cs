using Microsoft.AspNetCore.Mvc;
using ML.MLWebApi.Dtos;
using ML.MLWebApi.Services;
using ML_MLTraining;

namespace ML.MLWebApi.Controllers;

/// <summary>
/// Én samlet controller for alle ML-forudsigelser.
/// Route: POST /api/ml/{model}/predict
///
/// Gyldige model-navne:
///   - burnoutscore   → Forudsiger burnout score (float)
///   - mentalhealth   → Forudsiger mental health index (float)
///   - dropoutrisk    → Forudsiger dropout risiko (float, regression)
/// </summary>
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

    /// <summary>
    /// Forudsig burnout score.
    /// POST /api/ml/burnoutscore/predict
    /// </summary>
    [HttpPost("burnoutscore/predict")]
    [ProducesResponseType(typeof(PredictionResultDto<float>), StatusCodes.Status200OK)]
    public IActionResult PredictBurnoutScore([FromBody] StudentInputDto input)
        => Ok(_burnoutScore.PredictWithDetails(input));

    /// <summary>
    /// Forudsig mental health index.
    /// POST /api/ml/mentalhealth/predict
    /// </summary>
    [HttpPost("mentalhealth/predict")]
    [ProducesResponseType(typeof(PredictionResultDto<float>), StatusCodes.Status200OK)]
    public IActionResult PredictMentalHealth([FromBody] StudentInputDto input)
        => Ok(_mentalHealth.PredictWithDetails(input));

    /// <summary>
    /// Forudsig dropout risiko (regression score).
    /// POST /api/ml/dropoutrisk/predict
    /// </summary>
    [HttpPost("dropoutrisk/predict")]
    [ProducesResponseType(typeof(PredictionResultDto<float>), StatusCodes.Status200OK)]
    public IActionResult PredictDropoutRisk([FromBody] StudentInputDto input)
        => Ok(_dropoutRisk.PredictWithDetails(input));

    /// <summary>
    /// Kør ALLE 4 modeller på én gang og returnér samlet resultat.
    /// POST /api/ml/predict/all
    /// </summary>
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

/// <summary>
/// Wrapper der samler alle 4 modellers resultater.
/// </summary>
public class AllPredictionsDto
{
    public PredictionResultDto<float> BurnoutScore { get; set; } = null!;
    public PredictionResultDto<float> MentalHealth { get; set; } = null!;
    public PredictionResultDto<float> DropoutRisk { get; set; } = null!;
}