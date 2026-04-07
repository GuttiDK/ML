namespace ML.MLWebApi.Dtos;

public class StudentInputDto
{
    public float Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public float AcademicYear { get; set; }
    public float StudyHoursPerDay { get; set; }
    public float ExamPressure { get; set; }
    public float AcademicPerformance { get; set; }
    public float StressLevel { get; set; }
    public float AnxietyScore { get; set; }
    public float DepressionScore { get; set; }
    public float SleepHours { get; set; }
    public float PhysicalActivity { get; set; }
    public float SocialSupport { get; set; }
    public float ScreenTime { get; set; }
    public float InternetUsage { get; set; }
    public float FinancialStress { get; set; }
    public float FamilyExpectation { get; set; }

    // Bruges kun af MLDropoutRisk (som feature, ikke label)
    public float? BurnoutScore { get; set; }
    public float? MentalHealthIndex { get; set; }
    public string? RiskLevel { get; set; }
}