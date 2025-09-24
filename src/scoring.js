import { domains, aspects, questions } from './questions.js';

// 計算各領域分數
export const calculateDomainScores = (answers, isReligious) => {
  const currentQuestions = isReligious ? questions.religious : questions.non_religious;
  const domainScores = {};
  
  Object.keys(domains).forEach(domain => {
    const domainQuestions = currentQuestions.filter(q => q.domain === domain);
    const totalScore = domainQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const maxScore = domainQuestions.length * 6;
    domainScores[domain] = {
      score: totalScore,
      maxScore,
      percentage: (totalScore / maxScore) * 100,
      average: totalScore / domainQuestions.length
    };
  });
  
  return domainScores;
};

// 計算各面向分數
export const calculateAspectScores = (answers, isReligious) => {
  const currentQuestions = isReligious ? questions.religious : questions.non_religious;
  const aspectScores = {};
  
  Object.keys(aspects).forEach(aspect => {
    const aspectQuestions = currentQuestions.filter(q => q.aspect === aspect);
    const totalScore = aspectQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const maxScore = aspectQuestions.length * 6;
    aspectScores[aspect] = {
      score: totalScore,
      maxScore,
      percentage: (totalScore / maxScore) * 100,
      average: totalScore / aspectQuestions.length
    };
  });
  
  return aspectScores;
};

// 計算總體分數
export const calculateOverallScore = (answers, isReligious) => {
  const currentQuestions = isReligious ? questions.religious : questions.non_religious;
  const totalScore = currentQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  const maxScore = currentQuestions.length * 6;
  
  return {
    score: totalScore,
    maxScore,
    percentage: (totalScore / maxScore) * 100,
    average: totalScore / currentQuestions.length
  };
};

// 主要的計算分數函數 - 這是Report.jsx需要的函數
export const calculateScores = (answers, isReligious = false) => {
  const domainScores = calculateDomainScores(answers, isReligious);
  const aspectScores = calculateAspectScores(answers, isReligious);
  const overallScore = calculateOverallScore(answers, isReligious);
  
  return {
    domains: domainScores,
    aspects: aspectScores,
    overall: overallScore,
    isReligious
  };
};

// 其他函數保持不變...
export const getScoreLevel = (percentage) => {
  if (percentage >= 80) {
    return { level: '高', color: 'text-green-600', bgColor: 'bg-green-100', barColor: 'bg-green-500' };
  } else if (percentage >= 60) {
    return { level: '中', color: 'text-yellow-600', bgColor: 'bg-yellow-100', barColor: 'bg-yellow-500' };
  } else {
    return { level: '低', color: 'text-red-600', bgColor: 'bg-red-100', barColor: 'bg-red-500' };
  }
};

// 其他現有函數保持不變
