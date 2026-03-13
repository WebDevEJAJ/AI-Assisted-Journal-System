import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [loginMethod, setLoginMethod] = useState('name'); // 'name' or 'userid'

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
    // Auto-fill userId based on name
    if (inputName.trim()) {
      const autoUserId = inputName
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
      setUserId(autoUserId);
    } else {
      setUserId('');
    }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleEnter = () => {
    if (loginMethod === 'name') {
      if (name.trim()) {
        onLogin(userId || name.toLowerCase());
      } else {
        alert('Please enter your name');
      }
    } else {
      if (userId.trim()) {
        onLogin(userId);
      } else {
        alert('Please enter a user ID');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEnter();
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-card">
        <div className="login-header">
          <h1>🌿 ArvyaX Journal</h1>
          <p>AI-Powered Emotion Tracking</p>
        </div>

        <div className="login-content">
          <div className="login-tabs">
            <button
              className={`login-tab ${loginMethod === 'name' ? 'active' : ''}`}
              onClick={() => setLoginMethod('name')}
            >
              By Name
            </button>
            <button
              className={`login-tab ${loginMethod === 'userid' ? 'active' : ''}`}
              onClick={() => setLoginMethod('userid')}
            >
              By User ID
            </button>
          </div>

          <div className="login-form">
            {loginMethod === 'name' ? (
              <>
                <div className="form-group">
                  <label>Enter Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., John Doe"
                    className="input-field"
                    autoFocus
                  />
                  {name && (
                    <p className="autofill-info">
                      ✓ User ID: <span>{userId}</span>
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Enter Your User ID</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={handleUserIdChange}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., user123"
                    className="input-field"
                    autoFocus
                  />
                </div>
              </>
            )}

            <button
              className="login-button"
              onClick={handleEnter}
            >
              <span>Continue</span>
              <span className="arrow">→</span>
            </button>

            <p className="login-info">
              {loginMethod === 'name'
                ? 'Your name will be converted to a unique user ID'
                : 'Enter any ID to continue with your journaling'}
            </p>
          </div>

          <div className="login-footer">
            <p>✨ Track your emotions • Gain insights • Find peace ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
