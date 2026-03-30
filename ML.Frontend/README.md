# ML.Frontend

React Native/Expo app til toxic comment prediction.

## Teknologier

- React Native / Expo
- TypeScript
- Expo Router

## Kørsel

```bash
npm install
npx expo start
```

Scan QR-koden med Expo Go app på din telefon, eller kør i emulator.

## Features

- Simpel UI til at indtaste beskeder
- Kalder ML.MLWebApi for prediction
- Viser resultat med sandsynlighed og progress bar
- Dark/Light mode toggle

## API Konfiguration

Opdater API URL i `app/(tabs)/index.tsx`:

```typescript
const response = await fetch(
  `http://<DIN-IP>:50731/Predict?message=${encodeURIComponent(message)}`,
);
```

Erstat `<DIN-IP>` med din computers lokale IP-adresse (f.eks. `192.168.1.128`).

## Projektstruktur

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
