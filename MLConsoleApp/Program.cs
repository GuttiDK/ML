using ML.MLTraining;

Console.WriteLine("ML Model Trainer Console");
Console.WriteLine("========================");
Console.WriteLine();

// Træn modellen og gem den
string outputPath = "MLModel1.mlnet";
ModelTrainer.TrainModel(outputPath);

Console.WriteLine();
Console.WriteLine("Træning færdig! Modellen er gemt til: " + outputPath);
