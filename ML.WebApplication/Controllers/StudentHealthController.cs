using Microsoft.AspNetCore.Mvc;
using ML.MLTraining;

namespace ML.WebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentHealthController : ControllerBase
    {
        [HttpPost("burnout")]
        public ActionResult<PredictionResult> PredictBurnout([FromBody] StudentHealthInput input)
        {
            try
            {
                var modelInput = new MLBurnoutScore.ModelInput
                {
                    Age = input.Age,
                    Gender = input.Gender,
                    YearsLeft = input.YearsLeft,
                    StudyHours = input.StudyHours,
                    ExamPressure = input.ExamPressure,
                    Performance = input.Performance,
                    Stress = input.Stress,
                    Anxiety = input.Anxiety,
                    Depression = input.Depression,
                    Sleep = input.Sleep,
                    Physical = input.Physical,
                    ScreenTime = input.ScreenTime,
                    Internet = input.Internet,
                    FinancialStress = input.FinancialStress,
                    FamilyExpectation = input.FamilyExpectation
                };

                var result = MLBurnoutScore.Predict(modelInput);

                return Ok(new PredictionResult
                {
                    Score = Math.Clamp(result.Score, 0, 10)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Prediction failed", details = ex.Message });
            }
        }

        [HttpPost("mental-health")]
        public ActionResult<PredictionResult> PredictMentalHealth([FromBody] StudentHealthInput input)
        {
            try
            {
                var modelInput = new MLMentalHealth.ModelInput
                {
                    Age = input.Age,
                    Gender = input.Gender,
                    YearsLeft = input.YearsLeft,
                    StudyHours = input.StudyHours,
                    ExamPressure = input.ExamPressure,
                    Performance = input.Performance,
                    Stress = input.Stress,
                    Anxiety = input.Anxiety,
                    Depression = input.Depression,
                    Sleep = input.Sleep,
                    Physical = input.Physical,
                    ScreenTime = input.ScreenTime,
                    Internet = input.Internet,
                    FinancialStress = input.FinancialStress,
                    FamilyExpectation = input.FamilyExpectation
                };

                var result = MLMentalHealth.Predict(modelInput);

                return Ok(new PredictionResult
                {
                    Score = Math.Clamp(result.Score, 0, 10)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Prediction failed", details = ex.Message });
            }
        }

        [HttpPost("dropout-risk")]
        public ActionResult<PredictionResult> PredictDropoutRisk([FromBody] DropoutRiskInput input)
        {
            try
            {
                // Calculate dropout risk from burnout score and mental health score
                var dropoutRisk = (input.BurnoutScore + (10 - input.MentalHealthScore)) / 2;

                return Ok(new PredictionResult
                {
                    Score = Math.Clamp(dropoutRisk, 0, 10)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Calculation failed", details = ex.Message });
            }
        }
    }

    public class StudentHealthInput
    {
        public float Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public float YearsLeft { get; set; }
        public float StudyHours { get; set; }
        public float ExamPressure { get; set; }
        public float Performance { get; set; }
        public float Stress { get; set; }
        public float Anxiety { get; set; }
        public float Depression { get; set; }
        public float Sleep { get; set; }
        public float Physical { get; set; }
        public float ScreenTime { get; set; }
        public float Internet { get; set; }
        public float FinancialStress { get; set; }
        public float FamilyExpectation { get; set; }
    }

    public class DropoutRiskInput
    {
        public float BurnoutScore { get; set; }
        public float MentalHealthScore { get; set; }
    }

    public class PredictionResult
    {
        public float Score { get; set; }
    }
}