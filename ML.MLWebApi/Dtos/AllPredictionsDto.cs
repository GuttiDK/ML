namespace ML.MLWebApi.Dtos
{
    public class AllPredictionsDto
    {
        public PredictionResultDto<float> BurnoutScore { get; set; } = null!;
        public PredictionResultDto<float> MentalHealth { get; set; } = null!;
        public PredictionResultDto<float> DropoutRisk { get; set; } = null!;
    }
}
