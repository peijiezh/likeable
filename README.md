# Likeability Test Website

## Project Structure

### Directory Structure
```
├── public/
│   ├── questions.csv     # Question data storage
│   └── vite.svg         # Vite logo,it appears in the browser's tab bar, bookmarks, and other places where website icons are displayed

├── src/
│   ├── components/      # React components
│   │   ├── Welcome.tsx  # Landing page
│   │   ├── Test.tsx     # Test interface
│   │   └── Results.tsx  # Results visualization
│   ├── App.tsx         # Main application component, 标题文字啥的都在这里
│   └── main.tsx        # Application entry point
└── package.json        # Project dependencies and scripts
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
