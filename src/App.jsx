// 導入 React 的 useState Hook 用於狀態管理
import { useState } from 'react';

// 導入各個頁面組件
import Home from './components/Home.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import Profile from './components/Profile.jsx';
import Report from './components/Report.jsx';
import Admin from './components/Admin.jsx';
import Navigation from './components/Navigation.jsx';

// 導入樣式檔案
import './App.css';

function App() {
  // 當前步驟狀態：控制顯示哪個頁面
  // 可能的值：'home', 'questionnaire', 'profile', 'report', 'admin'
  const [currentStep, setCurrentStep] = useState('home');
  
  // 評估數據狀態：儲存問卷答案、宗教信仰狀態和個人資料
  const [assessmentData, setAssessmentData] = useState({
    answers: {},        // 問卷答案
    isReligious: false, // 是否有宗教信仰
    profile: {}         // 個人資料
  });

  // 處理開始評估：從首頁跳轉到問卷頁面
  const handleStartAssessment = () => {
    setCurrentStep('questionnaire');
  };

  // 處理問卷完成：儲存答案和宗教信仰狀態，跳轉到個人資料頁面
  const handleQuestionnaireComplete = (answers, isReligious) => {
    setAssessmentData(prev => ({
      ...prev,
      answers,
      isReligious
    }));
    setCurrentStep('profile');
  };

  // 處理個人資料完成：儲存個人資料，跳轉到報告頁面
  const handleProfileComplete = (profile) => {
    setAssessmentData(prev => ({
      ...prev,
      profile
    }));
    setCurrentStep('report');
  };

  // 處理重新開始：重置所有數據，回到首頁
  const handleRestart = () => {
    setAssessmentData({
      answers: {},
      isReligious: false,
      profile: {}
    });
    setCurrentStep('home');
  };

  // 處理導航：跳轉到指定頁面
  const handleNavigate = (step) => {
    setCurrentStep(step);
  };

  // 根據當前步驟渲染對應的組件
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
        // 預設情況下顯示首頁
        return <Home onStartAssessment={handleStartAssessment} />;
    }
  };

  return (
    <div className="App">
      {/* 導航組件：顯示在所有頁面頂部 */}
      <Navigation 
        currentPage={currentStep} 
        onNavigate={handleNavigate}
        totalResponses={0}
      />
      
      {/* 主要內容區域：根據當前步驟顯示不同的組件 */}
      <main>
        {renderCurrentStep()}
      </main>
    </div>
  );
}

export default App;
