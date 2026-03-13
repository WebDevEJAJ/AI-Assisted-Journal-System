const axios = require('axios');
const crypto = require('crypto');

// Mock LLM Analysis (fallback if API fails)
const mockAnalyzeEmotion = (text) => {
  const emotions = ['calm', 'joyful', 'peaceful', 'energetic', 'reflective', 'hopeful'];
  const keywords = ['nature', 'rain', 'peace', 'tranquility', 'serenity', 'focus', 'mindfulness'];
  
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  const selectedKeywords = keywords
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 2);
  
  return {
    emotion: randomEmotion,
    keywords: selectedKeywords,
    summary: `User experienced ${randomEmotion} feelings during the nature immersive session.`
  };
};

// Real LLM Analysis using Hugging Face
const analyzeEmotionWithLLM = async (text) => {
  try {
    // For demonstration, we'll use a simple approach
    // In production, you would use Hugging Face API or another LLM service
    
    // Extract potential emotions from text using keywords
    const emotionKeywords = {
      'calm': ['calm', 'peaceful', 'serene', 'relaxed', 'tranquil'],
      'joyful': ['happy', 'joyful', 'delighted', 'pleased', 'excited'],
      'peaceful': ['peace', 'peaceful', 'harmony', 'balance'],
      'energetic': ['energetic', 'active', 'vibrant', 'lively'],
      'reflective': ['reflect', 'think', 'ponder', 'meditate'],
      'hopeful': ['hope', 'hopeful', 'optimistic', 'positive']
    };

    let detectedEmotion = 'peaceful';
    const lowerText = text.toLowerCase();
    
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        detectedEmotion = emotion;
        break;
      }
    }

    // Extract keywords from text
    const keywordsList = ['rain', 'forest', 'nature', 'peace', 'calm', 'serene', 
                         'listening', 'meditation', 'focus', 'mindfulness', 'tranquility'];
    const foundKeywords = keywordsList.filter(keyword => 
      lowerText.includes(keyword)
    ).slice(0, 5);

    return {
      emotion: detectedEmotion,
      keywords: foundKeywords.length > 0 ? foundKeywords : ['nature', 'mindfulness'],
      summary: `User experienced ${detectedEmotion} moments with focus on ${foundKeywords.join(', ') || 'nature'}. The session appears to have provided mental clarity and relaxation.`
    };
  } catch (error) {
    console.error('Error in LLM analysis:', error);
    return mockAnalyzeEmotion(text);
  }
};

module.exports = {
  analyzeEmotionWithLLM,
  mockAnalyzeEmotion
};
