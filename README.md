# 🌿 ArvyaX AI-Assisted Journal System

A full-stack application that helps users track and analyze their emotions through immersive nature sessions using AI-powered LLM analysis.

## Features

✅ **Journal Entry Management** - Create and store journal entries with different ambience types (forest, ocean, mountain)
✅ **Emotion Analysis** - Real-time emotion detection from journal text
✅ **Intelligent Caching** - Cache analysis results to reduce LLM calls
✅ **User Insights** - View emotion breakdown and trends over time
✅ **Clean UI** - Simple, intuitive frontend for easy navigation

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: React 18
- **Database**: SQLite3
- **LLM**: Hugging Face / Built-in emotion analysis

## Project Structure

```
PROJECT ASSINGMENT/
├── backend/
│   ├── server.js              # Express server with all API endpoints
│   ├── database.js            # SQLite database setup and initialization
│   ├── llmService.js          # LLM emotion analysis service
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   └── journal.db             # SQLite database (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component with all tabs
│   │   ├── App.css           # Styling
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   │   └── index.html        # HTML template
│   └── package.json          # Frontend dependencies
│
├── README.md                 # This file
└── ARCHITECTURE.md           # Architecture and design decisions
```

## API Endpoints

### 1. Create Journal Entry
```
POST /api/journal
Content-Type: application/json

{
  "userId": "123",
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain."
}

Response: 201 Created
{
  "id": 1,
  "userId": "123",
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain.",
  "createdAt": "2024-03-13T10:00:00.000Z"
}
```

### 2. Get User Journal Entries
```
GET /api/journal/:userId

Response: 200 OK
{
  "userId": "123",
  "entries": [...],
  "count": 8
}
```

### 3. Analyze Emotion
```
POST /api/journal/analyze
Content-Type: application/json

{
  "text": "I felt calm today after listening to the rain"
}

Response: 200 OK
{
  "emotion": "calm",
  "keywords": ["rain", "nature", "peace"],
  "summary": "User experienced relaxation during the forest session",
  "cached": false
}
```

### 4. Get User Insights
```
GET /api/journal/insights/:userId

Response: 200 OK
{
  "userId": "123",
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus", "nature", "rain"],
  "emotionBreakdown": {...},
  "ambienceBreakdown": {...}
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already provided):
```
PORT=5000
DATABASE_PATH=./journal.db
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Application will open on `http://localhost:3000`

## Database Schema

### journal_entries table
```sql
CREATE TABLE journal_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT NOT NULL,
  ambience TEXT NOT NULL,
  text TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### analysis_cache table
```sql
CREATE TABLE analysis_cache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  textHash TEXT UNIQUE NOT NULL,
  emotion TEXT NOT NULL,
  keywords TEXT NOT NULL,
  summary TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Frontend Features

### Write Entry Tab
- Select ambience type (forest, ocean, mountain)
- Write journal entry text
- Auto-save to database

### View Entries Tab
- Display all user journal entries
- Show entry metadata (date, ambience)
- One-click emotion analysis for each entry

### Analysis Tab
- Display detected emotion
- Show key themes/keywords
- Display analysis summary
- Indicate if result was cached

### Insights Tab
- Total entries count
- Top emotion across all entries
- Most used ambience type
- Recent keywords frequency
- Emotion breakdown with visual chart
- Ambience breakdown statistics

## How Emotion Analysis Works

The system analyzes emotions using:

1. **Keyword Detection** - Searches for emotion-related keywords in the text
2. **Pattern Matching** - Identifies emotional patterns in language
3. **LLM Processing** - Generates summaries and insights
4. **Caching** - Stores results to avoid redundant analysis

### Supported Emotions
- Calm
- Joyful
- Peaceful
- Energetic
- Reflective
- Hopeful

## Testing the System

1. **Create Entry**:
   - Enter User ID: `user123`
   - Select ambience: Forest
   - Write text: "I felt calm today listening to the rain and birds"
   - Click "Save Entry"

2. **View Entry**:
   - Go to "View Entries" tab
   - See your saved entry
   - Click "Analyze This Entry"

3. **View Analysis**:
   - See emotion: `calm`
   - Keywords: `["rain", "calm", "peace"]`
   - Summary: User-friendly interpretation

4. **Check Insights**:
   - Click "Insights" tab
   - See total entries: 1
   - Top emotion: calm
   - Keywords used

## Bonus Features Implemented

✅ **Caching Analysis Results** - MD5-based text hashing prevents duplicate LLM calls
✅ **Real LLM Integration** - Emotion analysis with keyword extraction
✅ **Data Persistence** - SQLite database stores all entries permanently
✅ **Responsive UI** - Works on desktop and mobile
✅ **User ID Support** - Multiple users can use the same instance

## Environment Variables

### Backend (.env)
```
PORT=5000                    # Server port
DATABASE_PATH=./journal.db   # SQLite database location
HUGGINGFACE_API_KEY=...     # Optional: For advanced LLM features
NODE_ENV=development         # Environment mode
```

## Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in server.js
- Verify proxy setting in frontend/package.json

### Database errors
- Delete `journal.db` file to reset
- Backend will auto-create new database on start

### Port already in use
```bash
# Use different port
PORT=5001 npm start
```

## Performance Considerations

- SQLite stores all data locally (no cloud dependency)
- LLM analysis is cached to reduce calls
- Frontend components are optimized with React hooks
- Efficient database queries with proper indexing

## Security Considerations

- Journal entries are stored with userId
- No sensitive authentication (for demo purposes)
- Input validation on all API endpoints
- CORS enabled for frontend communication

## Future Enhancements

- User authentication system
- Data encryption for sensitive entries
- Advanced analytics dashboard
- Export journal entries as PDF
- Mobile app version
- Streaming LLM responses
- Rate limiting per user
- Docker containerization

## License

MIT

## Author

ArvyaX Development Team

---

**Status**: ✅ Complete & Ready for Submission
**Last Updated**: March 13, 2026
**Deployment**: Can be deployed to Heroku, Vercel, or any Node.js hosting
