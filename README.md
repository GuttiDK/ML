# ML - Toxic Comment Prediction

Et Machine Learning projekt der bruger ML.NET til at forudsige om en kommentar/tweet er toksisk.

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

### Projektstruktur

```
ML.MLWebApi/
├── Controllers/
│   └── PredictController.cs    # API endpoint
├── Services/
│   └── PredictService.cs       # ML prediction service
└── Program.cs                  # App konfiguration
```

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
