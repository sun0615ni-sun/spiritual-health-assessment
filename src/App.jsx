import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import Profile from './components/Profile.jsx';
import Report from './components/Report.jsx';
import Admin from './components/Admin.jsx';
import Navigation from './components/Navigation.jsx';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('home'); // home, questionnaire, profile, report, admin
  const [assessmentData, setAssessmentData] = useState({
    answers: {},
    isReligious: false,
    profile: {}
  });

  const handleStartAssessment = () => {
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireComplete = (answers, isReligious) => {
    setAssessmentData(prev => ({
      ...prev,
      answers,
      isReligious
    }));
    setCurrentStep('profile');
  };

  const handleProfileComplete = (profile) => {
    setAssessmentData(prev => ({
      ...prev,
      profile
    }));
    setCurrentStep('report');
  };

  const handleRestart = () => {
    setAssessmentData({
      answers: {},
      isReligious: false,
      profile: {}
    });
    setCurrentStep('home');
  };

  const handleNavigate = (step) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'home':
        return <Home onStartAssessment={handleStartAssessment} />;
      case 'questionnaire':
        return (
          <Questionnaire
            onComplete={handleQuestionnaireComplete}
            onBack={() => setCurrentStep('home')}
          />
        );
      case 'profile':
        return (
          <Profile
            onComplete={handleProfileComplete}
            onBack={() => setCurrentStep('questionnaire')}
          />
        );
      case 'report':
        return (
          <Report
            assessmentData={assessmentData}
            onRestart={handleRestart}
          />
        );
      case 'admin':
        return <Admin />;
      default:
        return <Home onStartAssessment={handleStartAssessment} />;
    }
  };

  return (
    <div className="App">
      <Navigation 
        currentPage={currentStep} 
        onNavigate={handleNavigate}
        totalResponses={0}
      />
      <main>
        {renderCurrentStep()}
      </main>
    </div>
  );
}

export default App;
