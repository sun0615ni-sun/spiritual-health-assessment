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

// 計算所有分數（Report組件需要的主函數）
export const calculateScores = (answers, isReligious) => {
  const domainScores = calculateDomainScores(answers, isReligious);
  const aspectScores = calculateAspectScores(answers, isReligious);
  const overallScore = calculateOverallScore(answers, isReligious);
  
  return {
    domainScores,
    aspectScores,
    overallScore
  };
};

// 獲取分數等級和顏色
export const getScoreLevel = (percentage) => {
  if (percentage >= 80) {
    return { level: '高', color: 'text-green-600', bgColor: 'bg-green-100', barColor: 'bg-green-500' };
  } else if (percentage >= 60) {
    return { level: '中', color: 'text-yellow-600', bgColor: 'bg-yellow-100', barColor: 'bg-yellow-500' };
  } else {
    return { level: '低', color: 'text-red-600', bgColor: 'bg-red-100', barColor: 'bg-red-500' };
  }
};

// 獲取建議文字
export const getRecommendations = (domainScores, aspectScores) => {
  const recommendations = [];
  
  // 找出分數最低的領域
  const lowestDomain = Object.entries(domainScores)
    .sort((a, b) => a[1].percentage - b[1].percentage)[0];
  
  // 找出分數最低的面向
  const lowestAspect = Object.entries(aspectScores)
    .sort((a, b) => a[1].percentage - b[1].percentage)[0];
  
  const domainRecommendations = {
    self: {
      title: "與自己的關係",
      suggestions: [
        "每日進行10分鐘的正念冥想或深呼吸練習",
        "寫日記記錄自己的情緒和想法",
        "設定明確的人生目標和價值觀",
        "培養感恩的習慣，每天記錄三件感謝的事"
      ]
    },
    others: {
      title: "與他人的關係",
      suggestions: [
        "練習積極聆聽，真正理解他人的感受",
        "主動表達關心和感謝",
        "學習寬恕，釋放對他人的怨恨",
        "參與志工服務或社區活動"
      ]
    },
    nature: {
      title: "與自然的關係",
      suggestions: [
        "每週至少花時間在大自然中散步",
        "觀察自然現象，培養敬畏之心",
        "減少對環境的負面影響",
        "種植植物或參與環保活動"
      ]
    },
    transcendent: {
      title: "與超越者的關係",
      suggestions: [
        "探索自己的靈性信念和價值觀",
        "參與宗教或靈性活動",
        "閱讀啟發性的書籍或文章",
        "培養對未來的希望和信心"
      ]
    }
  };
  
  if (lowestDomain[1].percentage < 70) {
    recommendations.push({
      type: 'domain',
      title: `加強${domainRecommendations[lowestDomain[0]].title}`,
      suggestions: domainRecommendations[lowestDomain[0]].suggestions
    });
  }
  
  const aspectRecommendations = {
    self_awareness: {
      title: "提升自我覺察",
      suggestions: [
        "練習正念冥想",
        "定期自我反思",
        "尋求他人的回饋",
        "記錄情緒日記"
      ]
    },
    meaning_in_life: {
      title: "尋找生命意義",
      suggestions: [
        "探索個人價值觀",
        "設定有意義的目標",
        "幫助他人",
        "追求個人成長"
      ]
    },
    inner_peace: {
      title: "培養內在平靜",
      suggestions: [
        "學習壓力管理技巧",
        "練習深呼吸",
        "建立規律的作息",
        "減少不必要的刺激"
      ]
    },
    gratitude_forgiveness: {
      title: "培養感恩與寬恕",
      suggestions: [
        "每日感恩練習",
        "學習寬恕的技巧",
        "表達感謝",
        "釋放負面情緒"
      ]
    },
    love_empathy: {
      title: "增進愛與同理",
      suggestions: [
        "練習同理心",
        "主動關心他人",
        "學習有效溝通",
        "培養慈悲心"
      ]
    },
    humility_awe: {
      title: "培養謙卑與敬畏",
      suggestions: [
        "接觸大自然",
        "學習新知識",
        "承認自己的限制",
        "欣賞他人的優點"
      ]
    },
    hope_faith: {
      title: "建立盼望與信心",
      suggestions: [
        "設定正面目標",
        "培養樂觀態度",
        "建立支持網絡",
        "探索靈性信念"
      ]
    }
  };
  
  if (lowestAspect[1].percentage < 70) {
    recommendations.push({
      type: 'aspect',
      title: aspectRecommendations[lowestAspect[0]].title,
      suggestions: aspectRecommendations[lowestAspect[0]].suggestions
    });
  }
  
  return recommendations;
};

// 靈修七原則
export const spiritualPrinciples = [
  {
    title: "覺察當下",
    description: "保持對當下時刻的清醒覺知，不被過去或未來所困擾"
  },
  {
    title: "接納自己",
    description: "以慈悲的心接納自己的不完美，包容自己的軟弱與限制"
  },
  {
    title: "感恩惜福",
    description: "對生命中的一切心存感激，珍惜所擁有的人事物"
  },
  {
    title: "寬恕釋懷",
    description: "學會寬恕他人和自己，釋放心中的怨恨與痛苦"
  },
  {
    title: "慈悲利他",
    description: "以慈悲心對待一切眾生，主動幫助需要的人"
  },
  {
    title: "謙卑敬畏",
    description: "保持謙卑的態度，對生命的奧秘心存敬畏"
  },
  {
    title: "信心盼望",
    description: "對未來保持信心和希望，相信生命的美好可能"
  }
];

// 日常實踐建議
export const dailyPractices = [
  {
    category: "晨間練習",
    practices: [
      "起床後進行5分鐘的感恩冥想",
      "設定當日的正面意圖",
      "閱讀啟發性的文字或經文"
    ]
  },
  {
    category: "日間覺察",
    practices: [
      "每小時停下來深呼吸三次",
      "在用餐前表達感謝",
      "對遇到的人展現善意"
    ]
  },
  {
    category: "晚間反思",
    practices: [
      "回顧一天中值得感謝的事",
      "反思自己的行為和情緒",
      "為明天設定正面的期待"
    ]
  },
  {
    category: "週間實踐",
    practices: [
      "每週至少一次親近大自然",
      "參與志工服務或幫助他人",
      "與親友分享愛與關懷"
    ]
  }
];
