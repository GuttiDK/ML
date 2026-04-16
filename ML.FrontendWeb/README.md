# 🎓 Student Health Prediction System

A comprehensive web application that predicts student burnout score, mental health status, and dropout risk based on multiple lifestyle and academic factors. Built with React, TypeScript, and Vite, with backend integration to machine learning prediction APIs.

## 📋 Overview

The Student Health Prediction System helps identify at-risk students by collecting data across multiple dimensions of student life and using machine learning models to predict three key metrics:

- **Burnout Score** (0-10): Likelihood of student burnout
- **Mental Health Index** (0-10): Overall mental health status
- **Dropout Risk** (0-10): Risk of dropping out of studies

## ✨ Features

### User-Friendly Form Wizard
- 6 multi-step pages with intuitive navigation
- Interactive sliders for numeric inputs (integer values only)
- Dropdown selection for gender/demographic data
- Real-time value display
- Progress tracking across pages

### Comprehensive Data Collection

**Page 1: Personal Information**
- Age (15-120)
- Gender (Dreng, Kvinde, Andet)
- Academic Year (0-10)

**Page 2: Academic Information**
- Study hours per day (0-24h)
- Exam pressure (0-10)
- Academic performance (0-100)

**Page 3: Mental Health**
- Stress level (0-10)
- Anxiety score (0-10)
- Depression score (0-10)

**Page 4: Lifestyle**
- Sleep hours (0-24h)
- Physical activity (0-24h)
- Screen time (0-24h)

**Page 5: External Factors**
- Internet usage (0-24h)
- Financial stress (0-10)
- Family expectation (0-10)

**Page 6: Social Support**
- Social support (0-10)

### Prediction System
- Parallel API calls for burnout and mental health predictions
- Sequential dropout risk calculation using both prediction results
- Fallback calculations if API calls fail
- Value clamping to ensure results stay within 0-10 range

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite 8** - Fast build tool & dev server
- **CSS3** - Modern styling with CSS variables

### Integration
- **Vite Dev Proxy** - Handles CORS for development
- **RESTful API** - JSON communication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd ML.FrontendWeb

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🔌 API Integration

The application connects to ML prediction APIs at `http://10.131.20.76:50731/api/ml`

### Endpoints Used

1. **POST /api/ml/burnoutscore/predict**
   - Input: Student health data
   - Output: `{ predictedValue: number }`

2. **POST /api/ml/mentalhealth/predict**
   - Input: Student health data
   - Output: `{ predictedValue: number }`

3. **POST /api/ml/dropoutrisk/predict**
   - Input: Student data + burnout & mental health scores
   - Output: `{ predictedValue: number }`

### CORS Configuration

During development, Vite's proxy intercepts `/api` requests and forwards them server-side, bypassing CORS restrictions. See `vite.config.ts` for configuration.

## 📁 Project Structure

```
src/
├── App.tsx                 # Main app component
├── App.css                 # Global styles
├── api.ts                  # API integration & predictions
├── types.ts                # TypeScript interfaces
├── constants.ts            # Form configuration
├── main.tsx               # Entry point
└── components/
    ├── Header.tsx         # App header with title
    ├── FormWizard.tsx     # Multi-step form container
    ├── FormPage.tsx       # Individual form page
    ├── FormField.tsx      # Form field component (slider/select/input)
    ├── Navigation.tsx     # Previous/Next/Submit buttons
    ├── Results.tsx        # Results display page
    ├── ResultCard.tsx     # Individual result card
    └── index.ts           # Component exports
```

## 🎨 Design

- **Color Scheme**: Purple/Indigo gradient theme
- **Responsive**: Mobile-friendly with adaptive layouts
- **Accessibility**: Semantic HTML, proper form labels
- **UX**: Slider controls for better user experience
- **Dark Mode**: Automatic detection with CSS media queries

## 📊 Data Flow

```
User Input (6 pages)
    ↓
Form Validation
    ↓
API Request #1 (Burnout) + API Request #2 (Mental Health) [Parallel]
    ↓
Receive Scores
    ↓
API Request #3 (Dropout Risk) [Uses results from #1 & #2]
    ↓
Display Results
```

## ⚙️ Configuration

### Form Fields
Edit `src/constants.ts` to modify form pages, fields, labels, min/max values, and input types.

### API Base URL
Update `src/api.ts` to change the API endpoint or add additional prediction models.

### Styling
Modify `src/App.css` to customize colors, spacing, animations, or responsive breakpoints.

## 🔍 Key Components

### FormField Component
Handles three input types:
- **slider**: Visual range input with value display
- **select**: Dropdown for predefined options
- **number**: Text input with type validation

All numeric inputs enforce integer values only.

### API Module
- Manages all API communication
- Handles parallel requests for efficiency
- Provides fallback calculations
- Includes error handling and logging

### Results Component
- Displays three prediction scores
- Color-coded cards with icons
- Start over button to reset form

## 🐛 Error Handling

- Network errors display user-friendly messages
- Failed API calls trigger fallback calculations
- Console logging for debugging
- Try-catch blocks for graceful failure

## 📝 License

This project is part of the ML Learning Path system.

## 🤝 Contributing

To modify or extend the application:

1. Update form fields in `constants.ts`
2. Modify API integration in `api.ts`
3. Add new components in `components/`
4. Update styles in `App.css`
5. Test thoroughly before deployment

---

**Last Updated**: April 14, 2026
