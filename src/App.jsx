      case 'home':
        return <Home onStartAssessment={handleStartAssessment} />;
      case 'questionnaire':
        return <Questionnaire onComplete={handleQuestionnaireComplete} />;
        return (
          <Questionnaire
            onComplete={handleQuestionnaireComplete}
            onBack={() => setCurrentStep('home')}
          />
        );
      case 'profile':
        return <Profile onComplete={handleProfileComplete} />;
        return (
          <Profile
            onComplete={handleProfileComplete}
            onBack={() => setCurrentStep('questionnaire')}
          />
        );
      case 'report':
        return <Report assessmentData={assessmentData} onRestart={handleRestart} />;
        return (
          <Report
            assessmentData={assessmentData}
            onRestart={handleRestart}
          />
        );
      case 'admin':
        return <Admin />;
      default:
@@ -69,8 +84,14 @@ function App() {

  return (
    <div className="App">
      <Navigation currentStep={currentStep} onNavigate={handleNavigate} />
      {renderCurrentStep()}
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
