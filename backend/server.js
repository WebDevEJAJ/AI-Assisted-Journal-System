const express = require('express');
const cors = require('cors');
const db = require('./database');
const { analyzeEmotionWithLLM } = require('./llmService');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ArvyaX Journal System API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      createJournal: 'POST /api/journal',
      getEntries: 'GET /api/journal/:userId',
      analyzeEmotion: 'POST /api/journal/analyze',
      getInsights: 'GET /api/journal/insights/:userId'
    },
    frontend: 'http://localhost:3000'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ============ JOURNAL ENDPOINTS ============

// 1. POST /api/journal - Create journal entry
app.post('/api/journal', (req, res) => {
  const { userId, ambience, text } = req.body;

  if (!userId || !ambience || !text) {
    return res.status(400).json({
      error: 'Missing required fields: userId, ambience, text'
    });
  }

  db.run(
    'INSERT INTO journal_entries (userId, ambience, text) VALUES (?, ?, ?)',
    [userId, ambience, text],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        userId,
        ambience,
        text,
        createdAt: new Date().toISOString()
      });
    }
  );
});

// 2. GET /api/journal/:userId - Get all entries for a user
app.get('/api/journal/:userId', (req, res) => {
  const { userId } = req.params;

  db.all(
    'SELECT * FROM journal_entries WHERE userId = ? ORDER BY createdAt DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        userId,
        entries: rows || [],
        count: (rows || []).length
      });
    }
  );
});

// 3. POST /api/journal/analyze - Analyze emotion in text
app.post('/api/journal/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text field is required' });
  }

  try {
    // Create hash of text for caching
    const textHash = crypto.createHash('md5').update(text).digest('hex');

    // Check cache first
    db.get(
      'SELECT * FROM analysis_cache WHERE textHash = ?',
      [textHash],
      async (err, cached) => {
        if (err) {
          console.error('Cache error:', err);
        }

        if (cached) {
          console.log('Returning cached analysis');
          return res.json({
            emotion: cached.emotion,
            keywords: JSON.parse(cached.keywords),
            summary: cached.summary,
            cached: true
          });
        }

        // Perform LLM analysis
        const analysis = await analyzeEmotionWithLLM(text);

        // Store in cache
        db.run(
          'INSERT INTO analysis_cache (textHash, emotion, keywords, summary) VALUES (?, ?, ?, ?)',
          [textHash, analysis.emotion, JSON.stringify(analysis.keywords), analysis.summary],
          (err) => {
            if (err) {
              console.error('Error caching analysis:', err);
            }
          }
        );

        res.json({
          ...analysis,
          cached: false
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /api/journal/insights/:userId - Get user insights
app.get('/api/journal/insights/:userId', (req, res) => {
  const { userId } = req.params;

  db.all(
    'SELECT * FROM journal_entries WHERE userId = ? ORDER BY createdAt DESC',
    [userId],
    async (err, entries) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!entries || entries.length === 0) {
        return res.json({
          userId,
          totalEntries: 0,
          topEmotion: null,
          mostUsedAmbience: null,
          recentKeywords: []
        });
      }

      // Calculate insights
      const ambienceCount = {};
      const emotions = {};
      const allKeywords = [];

      for (const entry of entries) {
        // Count ambience
        ambienceCount[entry.ambience] = (ambienceCount[entry.ambience] || 0) + 1;

        // Analyze emotions
        try {
          const analysis = await analyzeEmotionWithLLM(entry.text);
          emotions[analysis.emotion] = (emotions[analysis.emotion] || 0) + 1;
          allKeywords.push(...analysis.keywords);
        } catch (error) {
          console.error('Error analyzing entry:', error);
        }
      }

      // Get top values
      const topEmotion = Object.keys(emotions).reduce((a, b) => 
        emotions[a] > emotions[b] ? a : b, null);
      
      const mostUsedAmbience = Object.keys(ambienceCount).reduce((a, b) =>
        ambienceCount[a] > ambienceCount[b] ? a : b, null);

      // Get most frequent keywords
      const keywordCount = {};
      allKeywords.forEach(keyword => {
        keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
      });

      const recentKeywords = Object.keys(keywordCount)
        .sort((a, b) => keywordCount[b] - keywordCount[a])
        .slice(0, 5);

      res.json({
        userId,
        totalEntries: entries.length,
        topEmotion,
        mostUsedAmbience,
        recentKeywords,
        emotionBreakdown: emotions,
        ambienceBreakdown: ambienceCount
      });
    }
  );
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Health check: GET http://localhost:5000/health');
});

module.exports = app;
