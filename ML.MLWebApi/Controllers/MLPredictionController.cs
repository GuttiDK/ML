using Microsoft.AspNetCore.Mvc;
using ML.MLWebApi.Dtos;
using ML.MLWebApi.DTOs;
using ML.MLWebApi.Services;

namespace ML.MLWebApi.Controllers;

/// <summary>
/// Én samlet controller for alle ML-forudsigelser.
/// Route: POST /api/ml/{model}/predict
///
/// Gyldige model-navne:
///   - risklevel      → Forudsiger Low / Medium / High
///   - burnoutscore   → Forudsiger burnout score (float)
///   - mentalhealth   → Forudsiger mental health index (float)
///   - dropoutrisk    → Forudsiger dropout risiko (float, regression)
/// </summary>
[ApiController]
[Route("api/ml")]
public class MLPredictionController : ControllerBase
{
    private readonly IMLPredictionService<
        ML.MLTraining.StudentHealth.MLRiskLevel.ModelInput,
        ML.MLTraining.StudentHealth.MLRiskLevel.ModelOutput,
        string> _riskLevel;

    private readonly IMLPredictionService<
        ML.MLTraining.StudentHealth.MLBurnoutScore.ModelInput,
        ML.MLTraining.StudentHealth.MLBurnoutScore.ModelOutput,
        float> _burnoutScore;

    private readonly IMLPredictionService<
        ML.MLTraining.StudentHealth.MLMentalHealth.ModelInput,
        ML.MLTraining.StudentHealth.MLMentalHealth.ModelOutput,
        float> _mentalHealth;

    private readonly IMLPredictionService<
        ML.MLTraining.StudentHealth.MLDropoutRisk.ModelInput,
        ML.MLTraining.StudentHealth.MLDropoutRisk.ModelOutput,
        float> _dropoutRisk;

    public MLPredictionController(
        IMLPredictionService<
            ML.MLTraining.StudentHealth.MLRiskLevel.ModelInput,
            ML.MLTraining.StudentHealth.MLRiskLevel.ModelOutput,
            string> riskLevel,
        IMLPredictionService<
            ML.MLTraining.StudentHealth.MLBurnoutScore.ModelInput,
            ML.MLTraining.StudentHealth.MLBurnoutScore.ModelOutput,
            float> burnoutScore,
        IMLPredictionService<
            ML.MLTraining.StudentHealth.MLMentalHealth.ModelInput,
            ML.MLTraining.StudentHealth.MLMentalHealth.ModelOutput,
            float> mentalHealth,
        IMLPredictionService<
            ML.MLTraining.StudentHealth.MLDropoutRisk.ModelInput,
            ML.MLTraining.StudentHealth.MLDropoutRisk.ModelOutput,
            float> dropoutRisk)
    {
        _riskLevel = riskLevel;
        _burnoutScore = burnoutScore;
        _mentalHealth = mentalHealth;
        _dropoutRisk = dropoutRisk;
    }

    /// <summary>
    /// Forudsig risk level (Low/Medium/High).
    /// POST /api/ml/risklevel/predict
    /// </summary>
    [HttpPost("risklevel/predict")]
    [ProducesResponseType(typeof(PredictionResultDto<string>), StatusCodes.Status200OK)]
    public IActionResult PredictRiskLevel([FromBody] StudentInputDto input)
        => Ok(_riskLevel.PredictWithDetails(input));

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
            RiskLevel = _riskLevel.PredictWithDetails(input),
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
    public PredictionResultDto<string> RiskLevel { get; set; } = null!;
    public PredictionResultDto<float> BurnoutScore { get; set; } = null!;
    public PredictionResultDto<float> MentalHealth { get; set; } = null!;
    public PredictionResultDto<float> DropoutRisk { get; set; } = null!;
}