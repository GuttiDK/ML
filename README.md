# ML - StudentHealth Prediction System

En Machine Learning løsning til at forudsige mentalt helbred og frafaldrisiko blandt studerende på kortere uddannelser.

---

## Casebeskrivelse: StudentHealth - Task Case

### Baggrund
Mange elever på kortere uddannelser oplever stress, mistrivsel og i værste fald frafald. Det er ofte svært for undervisere og vejledere at opdage disse tegn i tide. Dette projekt anvender Machine Learning til at give et tidligt inblik i elevernes mentale tilstand.

### Formål
Systemet skal forudsige tre centrale målpunkter for den enkelte elev:

1. **Burnout score** – Hvor tæt er eleven på at brænde ud?
2. **Mental trivsel** – Hvordan har eleven det mentalt overordnet set?
3. **Frafaldrisiko** – Hvor stor er sandsynligheden for at eleven dropper ud af uddannelsen?

### Teknisk løsning
Projektet består af to dele der arbejder sammen:

- **Backend** – En ASP.NET Core Web API integreret med en ML.NET model, trænet på elevdata under StudentHealth. Modellen indlæses dynamisk og anvendes til at lave forudsigelser i realtid.
- **Frontend** – En React/Vite webapplikation hvor brugeren kan indtaste elevdata og øjeblikkeligt få vist forudsigelserne fra ML-modellen. Frontenden kommunikerer med backend via API-kald.

### Målgruppe
Vejledere, lærere og administrative medarbejdere på kortere uddannelser (under 4 år), fx erhvervsuddannelser eller professionsuddannelser.

### Forventet værdi
Systemet giver fagpersonale et datadrevet beslutningsgrundlag, så de proaktivt kan sætte ind med støtte, før en elev når et kritisk punkt.

---

## Datasæt

**Kilde:** [Kaggle - Student Mental Health and Burnout](https://www.kaggle.com/datasets/sharmajicoder/student-mental-health-and-burnout)

### Datasætbeskrivelse
Datasættet indeholder 999.999+ elevobservationer med følgende nøgleindikatorer:

**Demografiske data:**
- Alder
- Køn
- Uddannelsesår

**Velvære-indikatorer:**
- Studie timer pr. dag
- Eksamensstress (0-10 skala)
- Akademisk præstation
- Stressniveau
- Angstscore
- Depressionsscore

**Livsstilsfaktorer:**
- Søvntimer
- Fysisk aktivitet
- Socialt netværk/support
- Skærmtid
- Internetforbrug

**Sociale faktorer:**
- Økonomisk stress
- Familieforventninger

**Target-variabler:**
- Burnout score (numerisk)
- Mental sundhed (klassifikation)
- Frafaldrisiko (klassifikation)

---

## Databehandling og Preprocessing

### Data Import & Validering
1. Datasættet indlæses og valideres for manglende værdier
2. Outliers identificeres og håndteres
3. Datatyper konverteres til de korrekte formater

### Feature Engineering
1. **Normalisering** – Numeriske features skaleres til [0, 1] intervallet for bedre modelperformance
2. **Kategorisk encoding** – Kategoriske variabler (fx køn) konverteres til numeriske værdier
3. **Feature scaling** – Sikrer at alle features har sammenlignelig vægt i modellen

### Data Split
- **80%** træningsdata til modeludvikling
- **20%** testdata til validering og evaluering

### Håndtering af ubalanceret data
- Ved klassifikationsopgaver bruges teknikker som stratified splitting for at opretholde klassefordeling

---

## ML-Algoritmer og ML.NET Implementation

### Valgte algoritmer

#### 1. Burnout Score Prediction (Regression)
**Algoritme:** Fast Tree Regression (Gradient Boosting)
- **Formål:** Forudsige et kontinuerligt burnout-score (0-100)
- **Grund for valg:** Håndterer komplekse ikke-lineære forhold mellem features
- **Hyperparametre:** Tunet for optimal generalisering

#### 2. Mental Health Status (Classification)
**Algoritme:** Light GBM Classification (Gradient Boosting)
- **Formål:** Klassificere elevens mentale sundhedsstatus
- **Klasser:** Healthy, Stressed, Depressed
- **Grund for valg:** Høj nøjagtighed og hurtig inference

#### 3. Dropout Risk (Classification)
**Algoritme:** Light GBM Classification
- **Formål:** Klassificere frafaldrisiko
- **Klasser:** Low, Medium, High
- **Grund for valg:** Balancerer præcision med klassifikationsspeed

### ML.NET Pipeline

```csharp
// Eksempel på ML.NET pipeline struktur:
var pipeline = mlContext.Transforms
    .CopyColumns(...)              // Kopi af features
    .Append(mlContext.Transforms
        .NormalizeMinMax(...))      // Normalisering
    .Append(mlContext.Transforms
        .Categorical.OneHotEncoding(...))  // Encoding af kategoriske data
    .Append(mlContext.Regression
        .Trainers.FastTree(...));   // Fast Tree algoritme
```

### Model Training & Validering

1. **Cross-validation:** 5-fold cross-validation til robust evaluering
2. **Metriker:**
   - **Regression:** R², MAE, RMSE
   - **Classification:** Accuracy, Precision, Recall, F1-Score
3. **Hyperparameter tuning:** Grid search for optimal parameter valg

### Model Persistence
- Trænede modeller gemmes som `.mlnet` files
- Modeller indlæses ved runtime via `MLContext.Model.Load()`
- Modeller kopieres til output mappen under build process

---

## Projekter

| Projekt       | Beskrivelse                                    |
| ------------- | ---------------------------------------------- |
| ML.MLTraining | ML.NET træningsmodel og data                   |
| ML.MLWebApi   | ASP.NET Core Web API til at eksponere modellen |
| ML.Frontend   | React Native/Expo mobil app                    |

---

## Backend (ML.MLWebApi)

### Teknologier

- .NET 8
- ASP.NET Core Web API
- ML.NET (Microsoft.Extensions.ML)
- Swagger/OpenAPI

### Kørsel

```bash
cd ML.MLWebApi
dotnet run
```

API'et starter på:

- HTTPS: `https://localhost:<port>`
- HTTP: `http://localhost:<port>`

Swagger UI er tilgængelig på `/swagger`

### Build & Setup

1. **Første gang setup:**
   ```bash
   dotnet build
   ```
   Dette kopierer alle ML.NET modelfilerne til output mappen.

2. **After Clean Build:**
   - Stop debuggeren først (Shift+F5)
   - Derefter: `dotnet clean` og `dotnet build`

3. **Konfiguration:**
   - Modelfilerne placeres i `Models/` mappen i bin output
   - Sti konfigureres i `appsettings.json` under `ML:ModelBasePath`
   - Default pointing til: `C:\Users\Christian\source\repos\ML\ML.MLTraining\StudentHealth`

### API Endpoints

#### GET /Predict

Forudsiger om en besked er toksisk.

**Request:**

```
GET /Predict?message=din besked her
```

**Query Parameters:**
| Parameter | Type | Beskrivelse |
|-----------|------|-------------|
| message | string | Beskeden der skal analyseres (påkrævet) |

**Response (200 OK):**

```json
{
  "predictedLabel": "0",
  "score": [0.95, 0.05]
}
```

**Response (400 Bad Request):**

```json
"Message cannot be empty"
```

#### POST /ml/predictions/burnout-score

Forudsiger studerendes burnout score.

**Request:** Samme som risk-level

**Response:** Float værdi (0.0 - 1.0)

#### POST /ml/predictions/mental-health

Forudsiger mental sundhedsstatus.

**Response:** Float værdi

#### POST /ml/predictions/dropout-risk

Forudsiger frafaldrisiko.

**Response:** Float værdi

### Projektstruktur

```
ML.MLWebApi/
├── Controllers/
│   ├── PredictController.cs    # API endpoint
│   └── MLPredictionController.cs # ML predictions (Risk, Burnout, etc.)
├── Services/
│   ├── PredictService.cs       # Toxic comment prediction
│   ├── BurnoutScoreService.cs  # Student burnout score
│   └── MentalHealthService.cs  # Mental health prediction
├── Dtos/
│   ├── StudentInputDto.cs      # Input model for student predictions
│   └── PredictionResultDto.cs  # Response model
├── Program.cs                  # App konfiguration
└── Properties/
    └── launchSettings.json     # Launch configuration
```

### ML.NET Modeller

Projektet bruger flere ML.NET klassifikationsmodeller:

| Model | Placering | Formål |
|-------|-----------|--------|
| MLBurnoutScore.mlnet | `ML.MLTraining/StudentHealth/` | Forudsiger burnout score |
| MLMentalHealth.mlnet | `ML.MLTraining/StudentHealth/` | Forudsiger mental sundhedsstatus |
| MLDropoutRisk.mlnet | `ML.MLTraining/StudentHealth/` | Forudsiger frafaldrisiko |

#### Model Setup

Modelfilerne kopieres automatisk til output mappen under build:

1. **ML.MLTraining.csproj** - Markerer `.mlnet` filer for kopiering
2. **ML.MLWebApi.csproj** - Refererer til modelfilerne og kopierer dem til `bin/Debug/net8.0/Models/`

Efter build finder appen modelfilerne på:
```
bin/Debug/net8.0/Models/MLBurnoutScore.mlnet
bin/Debug/net8.0/Models/MLMentalHealth.mlnet
bin/Debug/net8.0/Models/MLDropoutRisk.mlnet
```

**Vigtig:** Stop debuggeren før du udfører `dotnet clean` eller en full rebuild.

---

## Frontend (ML.Frontend)

### Teknologier

- React Native / Expo
- TypeScript
- Expo Router

### Kørsel

```bash
cd ML.Frontend
npm install
npx expo start
```

Scan QR-koden med Expo Go app på din telefon, eller kør i emulator.

### Features

- Simpel UI til at indtaste beskeder
- Kalder ML.MLWebApi for prediction
- Viser resultat med sandsynlighed
- Dark/Light mode toggle

### Projektstruktur

```
ML.Frontend/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx           # Predict screen
│   └── _layout.tsx             # Root layout
├── components/                 # Reusable components
├── context/
│   └── theme-context.tsx       # Theme provider
├── hooks/                      # Custom hooks
└── constants/
    └── theme.ts                # Color definitions
```
