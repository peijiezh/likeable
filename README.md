# Likeability Test Website

## Project Structure

### Directory Structure

```
├── public/                  # Public assets directory
│   ├── questions.csv       # Question data storage for the test
│   └── vite.svg           # Vite logo for browser tab and bookmarks
│
├── src/                    # Source code directory
│   ├── components/        # React component directory
│   │   ├── Welcome.tsx    # Landing page with test introduction
│   │   ├── Test.tsx       # Test interface with question display and navigation
│   │   └── Results.tsx    # Results visualization and score analysis
│   ├── App.css           # Global application styles
│   ├── App.tsx           # Main application component with routing and layout
│   ├── index.css         # Global CSS reset and base styles
│   ├── main.tsx          # Application entry point
│   └── vite-env.d.ts     # TypeScript declarations for Vite
│
├── .gitignore             # Git ignore configuration
├── eslint.config.js       # ESLint configuration for code linting
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked versions of dependencies
├── tsconfig.json          # Main TypeScript configuration
├── tsconfig.app.json      # TypeScript config for application
├── tsconfig.node.json     # TypeScript config for Node.js environment
└── vite.config.ts         # Vite build tool configuration
```

### Component Architecture

1. **App.tsx**
   - Main application container
   - Implements routing using React Router
   - Provides consistent layout with header

2. **Welcome Component**
   - Landing page with test introduction
   - Simple, clean interface with start button
   - Routes to test component on start

3. **Test Component**
   - Handles question display and navigation
   - Features:
     - Progress bar
     - Question cards with 5-point Likert scale
     - Previous/Next navigation
     - Answer state management

4. **Results Component**
   - Displays test results and analysis
   - Features:
     - Pentagon visualization of dimension scores
     - Detailed dimension-specific feedback
     - Overall likeability score
     - Option to retake test

### Data Management

1. **Question Storage**
   - Questions stored in CSV format
   - Structure:
     - Question ID
     - Dimension category
     - Question text

2. **State Management**
   - Local state using React useState
   - Navigation state handled by React Router
   - Score calculation and analysis in Results component

### Styling

- Emotion (CSS-in-JS) for component styling
- Responsive design with mobile considerations
- Consistent color scheme and typography
- Styled components for reusable UI elements

### Key Features

1. **Assessment Flow**
   - Sequential question presentation
   - Answer validation
   - Progress tracking

2. **Results Analysis**
   - Dimension-based scoring
   - Pentagon visualization
   - Personalized feedback based on scores

3. **User Experience**
   - Intuitive navigation
   - Visual feedback for selections
   - Responsive design for all devices

### Technical Stack

- React with TypeScript
- Emotion for styling
- React Router for navigation
- Vite as build tool
