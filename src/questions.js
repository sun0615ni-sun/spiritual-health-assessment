export const domains = {
  self: "與自己的關係",
  others: "與他人的關係",
  nature: "與自然的關係",
  transcendent: "與超越者的關係",
};

export const aspects = {
  self_awareness: "自我覺察",
  meaning_in_life: "生命意義",
  inner_peace: "內在平靜",
  gratitude_forgiveness: "感恩與寬恕",
  love_empathy: "愛與同理",
  humility_awe: "謙卑與敬畏",
  hope_faith: "盼望與信心",
};

// 題目會根據宗教信仰狀態顯示不同版本
// 每個題目都有專屬的領域(domain)和面向(aspect)分類，用於結果頁評分
export const questions = {
  // 沒有宗教信仰者的題目版本
  non_religious: [
    {
      id: "q1",
      text: "我能清楚地意識到自己當下的情緒、想法和身體感受。",
      domain: "self",
      aspect: "self_awareness",
      category: "自我覺察", // 內部分類，不顯示給用戶
    },
    {
      id: "q2", 
      text: "我覺得我的生活有明確的目標和意義。",
      domain: "self",
      aspect: "meaning_in_life",
      category: "生命意義",
    },
    {
      id: "q3",
      text: "即使面對壓力和挑戰，我內心仍能保持平靜和穩定。",
      domain: "self",
      aspect: "inner_peace",
      category: "內在平靜",
    },
    {
      id: "q4",
      text: "我時常對生活中的人事物心存感激，並且能夠原諒曾經傷害過我的人。",
      domain: "others",
      aspect: "gratitude_forgiveness",
      category: "感恩與寬恕",
    },
    {
      id: "q5",
      text: "我能夠真誠地關心他人，並從他人的角度理解他們。",
      domain: "others",
      aspect: "love_empathy",
      category: "愛與同理",
    },
    {
      id: "q6",
      text: "當我身處大自然中時，我會感到一種敬畏和連結感。",
      domain: "nature",
      aspect: "humility_awe",
      category: "謙卑與敬畏",
    },
    {
      id: "q7",
      text: "我相信宇宙或生命本身有一種超越個人的力量或秩序。",
      domain: "transcendent",
      aspect: "hope_faith",
      category: "盼望與信心",
    },
  ],
  
  // 有宗教信仰者的題目版本
  religious: [
    {
      id: "q1_r",
      text: "我能清楚地意識到聖靈/內在神性在我內心的引導。",
      domain: "self",
      aspect: "self_awareness",
      category: "自我覺察",
    },
    {
      id: "q2_r",
      text: "我相信我的生命是上帝/神聖計畫的一部分，並為此而活。",
      domain: "self",
      aspect: "meaning_in_life",
      category: "生命意義",
    },
    {
      id: "q3_r",
      text: "透過祈禱、默想或讀經，我的內心能獲得從神而來的平安。",
      domain: "self",
      aspect: "inner_peace",
      category: "內在平靜",
    },
    {
      id: "q4_r",
      text: "我感謝神所賜予的一切，並願意遵從祂的教導去寬恕他人。",
      domain: "others",
      aspect: "gratitude_forgiveness",
      category: "感恩與寬恕",
    },
    {
      id: "q5_r",
      text: "我努力以神的愛去愛人，並在他人身上看見神的面容。",
      domain: "others",
      aspect: "love_empathy",
      category: "愛與同理",
    },
    {
      id: "q6_r",
      text: "在神的創造中，我看見自己的渺小，並對祂的偉大感到敬畏。",
      domain: "nature",
      aspect: "humility_awe",
      category: "謙卑與敬畏",
    },
    {
      id: "q7_r",
      text: "我對我的信仰有堅定的信心，相信祂會帶領我走過人生的所有高山低谷。",
      domain: "transcendent",
      aspect: "hope_faith",
      category: "盼望與信心",
    },
  ],
};
