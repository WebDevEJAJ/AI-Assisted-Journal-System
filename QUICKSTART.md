# 🚀 Quick Start Guide

This guide will help you run the ArvyaX Journal System in 5 minutes.

## Prerequisites

- **Node.js** (v14+) - Download from https://nodejs.org/
- **npm** (comes with Node.js)

## One-Command Setup (Windows)

```bash
# Double-click setup.bat
setup.bat
```

## One-Command Setup (Mac/Linux)

```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Running the Application

### Terminal 1 - Backend Server

```bash
cd backend
npm start
```

You should see:
```
Server running on http://localhost:5000
Health check: GET http://localhost:5000/health
```

### Terminal 2 - Frontend Application  

```bash
cd frontend
npm start
```

Your browser will automatically open `http://localhost:3000`

## Using the Application

1. **Write Entry**: 
   - Go to "Write Entry" tab
   - Select ambience (Forest, Ocean, Mountain)
   - Write your thoughts
   - Click "Save Entry"

2. **View Entries**:
   - Go to "View Entries" tab
   - See all your saved entries
   - Click "Analyze This Entry" on any entry

3. **Check Analysis**:
   - View detected emotion
   - See key keywords
   - Read AI-generated summary

4. **View Insights**:
   - Click "Insights" tab
   - See emotion trends
   - View ambience preferences
   - Check most used keywords

## Troubleshooting

### Backend won't start
```
Error: Port 5000 is already in use

Solution:
- Close the application using port 5000
- OR change PORT in backend/.env to 5001
```

### Frontend can't connect to backend
```
Error: Network error when fetching entries

Solution:
- Make sure backend is running (npm start in backend folder)
- Check that port 5000 is accessible
- Clear browser cache and refresh
```

### npm install fails
```
Error: npm ERR!

Solution:
1. Delete node_modules folder
2. Delete package-lock.json
3. Run npm install again
```

### Database errors
```
Error: Cannot open database

Solution:
- Delete journal.db file
- Restart backend server
- Database will be auto-created
```

## Environment Variables

Create `.env` file in backend folder:

```
PORT=5000
DATABASE_PATH=./journal.db
NODE_ENV=development
HUGGINGFACE_API_KEY=hf_YOUR_TOKEN_HERE
```

## Using Docker (Optional - Bonus)

If you have Docker installed:

```bash
# Build and run both services
docker-compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## Testing the API

Use tools like curl, Postman, or Thunder Client:

### Create Entry
```
POST http://localhost:5000/api/journal
{
  "userId": "user123",
  "ambience": "forest",
  "text": "I felt peaceful listening to nature sounds"
}
```

### Get Entries
```
GET http://localhost:5000/api/journal/user123
```

### Analyze Text
```
POST http://localhost:5000/api/journal/analyze
{
  "text": "I felt calm and relaxed"
}
```

### Get Insights
```
GET http://localhost:5000/api/journal/insights/user123
```

## Project Structure

```
PROJECT ASSINGMENT/
├── backend/
│   ├── server.js          # Main Express server
│   ├── database.js        # SQLite setup
│   ├── llmService.js      # Emotion analysis
│   ├── package.json       # Dependencies
│   └── .env               # Config
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styling
│   │   └── index.js      # Entry point
│   ├── public/
│   │   └── index.html    # HTML
│   └── package.json      # Dependencies
├── README.md             # Full documentation
└── ARCHITECTURE.md       # Technical design
```

## Common Commands

### Backend
```
npm start        # Start server
npm run dev      # Start with nodemon (auto-reload)
```

### Frontend
```
npm start        # Start dev server
npm run build    # Create production build
npm test         # Run tests
```

## Browser Compatibility

- Chrome/Chromium (✓)
- Firefox (✓)
- Safari (✓)
- Edge (✓)

## Performance Tips

1. **Faster Frontend Build**: 
   ```
   npm run build  # Creates optimized version
   ```

2. **Database Performance**:
   - Backend auto-indexes by userId
   - Analysis results are cached
   - Queries are optimized

3. **Backend Performance**:
   - Use `npm run dev` for development
   - Use `npm start` for production
   - Database connections are pooled

## Next Steps

1. ✅ Run the application
2. ✅ Create some journal entries
3. ✅ Test the emotion analysis
4. ✅ Check your insights
5. ✅ Review the documentation for deployment

## Support

For issues:
1. Check the README.md for detailed docs
2. Check ARCHITECTURE.md for design decisions
3. Review troubleshooting section above
4. Check terminal console for error messages

---

**Happy Journaling! 🌿**
