using MLConsoleApp;
using ML.MLTraining;

var builder = WebApplication.CreateBuilder(args);

// Register ML models
builder.Services.AddPredictionEnginePool<MLModel1.ModelInput, MLModel1.ModelOutput>()
    .FromFile("MLModel1.mlnet");

builder.Services.AddPredictionEnginePool<MLBurnoutScore.ModelInput, MLBurnoutScore.ModelOutput>()
    .FromFile("StudentHealth\\MLBurnoutScore.mlnet");

builder.Services.AddPredictionEnginePool<MLMentalHealth.ModelInput, MLMentalHealth.ModelOutput>()
    .FromFile("StudentHealth\\MLMentalHealth.mlnet");

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
