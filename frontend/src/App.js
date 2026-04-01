import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [ambience, setAmbience] = useState('forest');
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('write');

  const API_URL = 'http://localhost:5000';

  // Fetch entries on mount and when userId changes
  useEffect(() => {
    if (userId) {
      fetchEntries();
    }
}, [userId, fetchEntries]);

 const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/journal/${userId}`);
      setEntries(response.data.entries || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
      alert('Error fetching entries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEntry = async (e) => {
    e.preventDefault();
    if (!journalText.trim()) {
      alert('Please write something in your journal');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/journal`, {
        userId,
        ambience,
        text: journalText
      });
      setJournalText('');
      fetchEntries();
      alert('Entry saved successfully!');
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Error saving entry');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (text) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/journal/analyze`, {
        text
      });
      setAnalysis(response.data);
      setActiveTab('analysis');
    } catch (error) {
      console.error('Error analyzing text:', error);
      alert('Error analyzing text');
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/journal/insights/${userId}`);
      setInsights(response.data);
      setActiveTab('insights');
    } catch (error) {
      console.error('Error fetching insights:', error);
      alert('Error fetching insights');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (newUserId) => {
    setUserId(newUserId);
    setIsLoggedIn(true);
    setActiveTab('write');
    fetchEntries();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
    setEntries([]);
    setInsights(null);
    setAnalysis(null);
    setActiveTab('write');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>🌿 ArvyaX Journal System</h1>
            <p>Track your emotions through immersive nature sessions</p>
          </div>
          <div className="header-user">
            <span className="user-name">👤 {userId}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="sidebar">
          <nav className="tabs">
            <button
              className={`tab-btn ${activeTab === 'write' ? 'active' : ''}`}
              onClick={() => setActiveTab('write')}
            >
              ✍️ Write Entry
            </button>
            <button
              className={`tab-btn ${activeTab === 'entries' ? 'active' : ''}`}
              onClick={() => { setActiveTab('entries'); fetchEntries(); }}
            >
              📖 View Entries
            </button>
            <button
              className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              🔍 Analysis
            </button>
            <button
              className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={fetchInsights}
            >
              📊 Insights
            </button>
          </nav>
        </div>

        <main className="main-content">
          {loading && <div className="loading">Loading...</div>}

          {/* Write Entry Tab */}
          {activeTab === 'write' && (
            <section className="section">
              <h2>Write Your Journal Entry</h2>
              <form onSubmit={handleSubmitEntry} className="form">
                <div className="form-group">
                  <label>Ambience Type:</label>
                  <select value={ambience} onChange={(e) => setAmbience(e.target.value)}>
                    <option value="forest">🌲 Forest</option>
                    <option value="ocean">🌊 Ocean</option>
                    <option value="mountain">⛰️ Mountain</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Thoughts:</label>
                  <textarea
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    placeholder="Write your feelings and thoughts here..."
                    rows="8"
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Save Entry
                </button>
              </form>
            </section>
          )}

          {/* View Entries Tab */}
          {activeTab === 'entries' && (
            <section className="section">
              <h2>Your Journal Entries</h2>
              {entries.length === 0 ? (
                <p className="empty">No entries yet. Start writing!</p>
              ) : (
                <div className="entries-list">
                  {entries.map((entry) => (
                    <div key={entry.id} className="entry-card">
                      <div className="entry-header">
                        <span className="ambience-badge">{entry.ambience}</span>
                        <span className="date">{new Date(entry.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="entry-text">{entry.text}</p>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleAnalyze(entry.text)}
                      >
                        Analyze This Entry
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <section className="section">
              <h2>Emotion Analysis</h2>
              {analysis ? (
                <div className="analysis-result">
                  <div className="emotion-box">
                    <h3>Detected Emotion</h3>
                    <p className="emotion-text">{analysis.emotion}</p>
                  </div>

                  <div className="analysis-details">
                    <div className="detail-item">
                      <h4>Key Themes:</h4>
                      <div className="keywords">
                        {analysis.keywords.map((keyword, idx) => (
                          <span key={idx} className="keyword-tag">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-item">
                      <h4>Summary:</h4>
                      <p>{analysis.summary}</p>
                    </div>

                    {analysis.cached && (
                      <p className="cache-note">✓ Result from cache</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="empty">Select an entry to analyze its emotions</p>
              )}
            </section>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <section className="section">
              <h2>Your Mental State Insights</h2>
              {insights && (
                <div className="insights-container">
                  <div className="insight-card">
                    <h3>Total Entries</h3>
                    <p className="big-number">{insights.totalEntries}</p>
                  </div>

                  <div className="insight-card">
                    <h3>Top Emotion</h3>
                    <p className="big-number">{insights.topEmotion || 'N/A'}</p>
                  </div>

                  <div className="insight-card">
                    <h3>Most Used Ambience</h3>
                    <p className="big-number">{insights.mostUsedAmbience || 'N/A'}</p>
                  </div>

                  <div className="insight-card full-width">
                    <h3>Recent Keywords</h3>
                    <div className="keywords">
                      {insights.recentKeywords.map((keyword, idx) => (
                        <span key={idx} className="keyword-tag">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {insights.emotionBreakdown && (
                    <div className="insight-card full-width">
                      <h3>Emotion Breakdown</h3>
                      <div className="breakdown">
                        {Object.entries(insights.emotionBreakdown).map(([emotion, count]) => (
                          <div key={emotion} className="breakdown-item">
                            <span>{emotion}</span>
                            <div className="bar" style={{ width: `${(count / insights.totalEntries) * 100}%` }}>
                              {count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
