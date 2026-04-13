using Microsoft.ML;
using ML.MLWebApi.Dtos;
using ML_MLTraining;

namespace ML.MLWebApi.Services;

// ─────────────────────────────────────────────
// BurnoutScore — Classification → float label
// ─────────────────────────────────────────────
public class BurnoutScoreService : IMLPredictionService<
    MLBurnoutScore.ModelInput,
    MLBurnoutScore.ModelOutput,
    float>
{
    private readonly PredictionEngine<MLBurnoutScore.ModelInput, MLBurnoutScore.ModelOutput> _engine;

    public BurnoutScoreService(MLContext mlContext, string modelPath)
    {
        var model = mlContext.Model.Load(modelPath, out _);
        _engine = mlContext.Model.CreatePredictionEngine<
            MLBurnoutScore.ModelInput,
            MLBurnoutScore.ModelOutput>(model);
    }

    public float Predict(StudentInputDto input)
        => _engine.Predict(MapInput(input)).Score;

    public PredictionResultDto<float> PredictWithDetails(StudentInputDto input)
    {
        var output = _engine.Predict(MapInput(input));
        return new PredictionResultDto<float>
        {
            PredictedValue = output.Score,
            ModelName = "BurnoutScore"
        };
    }

    private static MLBurnoutScore.ModelInput MapInput(StudentInputDto dto) => new()
    {
        Age = dto.Age,
        Gender = dto.Gender,
        Academic_year = dto.AcademicYear,
        Study_hours_per_day = dto.StudyHoursPerDay,
        Exam_pressure = dto.ExamPressure,
        Academic_performance = dto.AcademicPerformance,
        Stress_level = dto.StressLevel,
        Anxiety_score = dto.AnxietyScore,
        Depression_score = dto.DepressionScore,
        Sleep_hours = dto.SleepHours,
        Physical_activity = dto.PhysicalActivity,
        Social_support = dto.SocialSupport,
        Screen_time = dto.ScreenTime,
        Internet_usage = dto.InternetUsage,
        Financial_stress = dto.FinancialStress,
        Family_expectation = dto.FamilyExpectation
    };
}

// ─────────────────────────────────────────────
// MentalHealth — Classification → float label
// ─────────────────────────────────────────────
public class MentalHealthService : IMLPredictionService<
    MLMentalHealth.ModelInput,
    MLMentalHealth.ModelOutput,
    float>
{
    private readonly PredictionEngine<MLMentalHealth.ModelInput, MLMentalHealth.ModelOutput> _engine;

    public MentalHealthService(MLContext mlContext, string modelPath)
    {
        var model = mlContext.Model.Load(modelPath, out _);
        _engine = mlContext.Model.CreatePredictionEngine<
            MLMentalHealth.ModelInput,
            MLMentalHealth.ModelOutput>(model);
    }

    public float Predict(StudentInputDto input)
        => _engine.Predict(MapInput(input)).Score;

    public PredictionResultDto<float> PredictWithDetails(StudentInputDto input)
    {
        var output = _engine.Predict(MapInput(input));
        return new PredictionResultDto<float>
        {
            PredictedValue = output.Score,
            ModelName = "MentalHealth"
        };
    }

    private static MLMentalHealth.ModelInput MapInput(StudentInputDto dto) => new()
    {
        Age = dto.Age,
        Gender = dto.Gender,
        Academic_year = dto.AcademicYear,
        Study_hours_per_day = dto.StudyHoursPerDay,
        Exam_pressure = dto.ExamPressure,
        Academic_performance = dto.AcademicPerformance,
        Stress_level = dto.StressLevel,
        Anxiety_score = dto.AnxietyScore,
        Depression_score = dto.DepressionScore,
        Sleep_hours = dto.SleepHours,
        Physical_activity = dto.PhysicalActivity,
        Social_support = dto.SocialSupport,
        Screen_time = dto.ScreenTime,
        Internet_usage = dto.InternetUsage,
        Financial_stress = dto.FinancialStress,
        Family_expectation = dto.FamilyExpectation
    };
}

// ─────────────────────────────────────────────
// DropoutRisk — Regression → float score
// ─────────────────────────────────────────────
public class DropoutRiskService : IMLPredictionService<
    MLDropoutRisk.ModelInput,
    MLDropoutRisk.ModelOutput,
    float>
{
    private readonly PredictionEngine<MLDropoutRisk.ModelInput, MLDropoutRisk.ModelOutput> _engine;

    public DropoutRiskService(MLContext mlContext, string modelPath)
    {
        var model = mlContext.Model.Load(modelPath, out _);
        _engine = mlContext.Model.CreatePredictionEngine<
            MLDropoutRisk.ModelInput,
            MLDropoutRisk.ModelOutput>(model);
    }

    public float Predict(StudentInputDto input)
        => _engine.Predict(MapInput(input)).Score;

    public PredictionResultDto<float> PredictWithDetails(StudentInputDto input)
    {
        var output = _engine.Predict(MapInput(input));
        return new PredictionResultDto<float>
        {
            PredictedValue = output.Score,
            ModelName = "DropoutRisk"
        };
    }

    private static MLDropoutRisk.ModelInput MapInput(StudentInputDto dto) => new()
    {
        Age = dto.Age,
        Gender = dto.Gender,
        Academic_year = dto.AcademicYear,
        Study_hours_per_day = dto.StudyHoursPerDay,
        Exam_pressure = dto.ExamPressure,
        Academic_performance = dto.AcademicPerformance,
        Stress_level = dto.StressLevel,
        Anxiety_score = dto.AnxietyScore,
        Depression_score = dto.DepressionScore,
        Sleep_hours = dto.SleepHours,
        Physical_activity = dto.PhysicalActivity,
        Social_support = dto.SocialSupport,
        Screen_time = dto.ScreenTime,
        Internet_usage = dto.InternetUsage,
        Financial_stress = dto.FinancialStress,
        Family_expectation = dto.FamilyExpectation,
        Burnout_score = dto.BurnoutScore ?? 0f,
        Mental_health_index = dto.MentalHealthIndex ?? 0f,
    };
}