Readme

# Likeability Test Website

A modern, user-friendly web application that helps individuals assess and understand their likeability across different dimensions. The test provides insights into personal strengths and areas for improvement through an interactive questionnaire and visually appealing results.

## Features

### Core Functionality
- Sequential question-based assessment
- Visual results display using a pentagon diagram
- Detailed dimension-specific feedback
- Easy question management through CSV

### User Experience
- Clean, minimalist Apple-style UI design
- Simple, intuitive test progression
- Clear result visualization
- Responsive design for all devices

## Technical Overview

### Architecture
- Frontend-focused application
- Static site deployment on Vercel
- CSV-based question management for easy maintenance

### Data Structure
- 20 questions organized across 5 dimensions:
  - Emotional Intelligence (4 questions)
  - Communication (4 questions)
  - Authenticity (4 questions)
  - Social Skills (4 questions)
  - Positivity (4 questions)

### Question Management
- Questions stored in `questions.csv`
- Easy to maintain and update
- CSV format includes:
  - Question ID (1-20)
  - Dimension (one of the five categories)
  - Question Text (carefully crafted statements)

## Development

### Prerequisites
- Node.js
- npm/yarn

### Setup
1. Clone the repository
2. Install dependencies
3. Run development server

### Deployment
- Automated deployment through Vercel
- Zero-configuration setup

## Future Enhancements
- User accounts and history tracking
- Detailed analytics and trends
- Comparative analysis
- Personalized improvement suggestions

## Maintenance

### Updating Questions
To modify the test questions:
1. Open `questions.csv`
2. Edit questions while maintaining the format
3. Save the file
4. Deploy changes

No additional code changes required for question updates.
