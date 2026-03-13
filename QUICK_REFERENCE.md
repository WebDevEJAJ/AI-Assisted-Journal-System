# 🎯 QUICK REFERENCE CARD

## Start Here ⚡

```bash
# Windows
setup.bat

# Mac/Linux
chmod +x setup.sh && ./setup.sh

# Then open 2 terminals:
# Terminal 1: cd backend && npm start
# Terminal 2: cd frontend && npm start

# Open browser: http://localhost:3000
```

---

## 4 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/journal | Create entry |
| GET | /api/journal/:userId | Get entries |
| POST | /api/journal/analyze | Analyze emotion |
| GET | /api/journal/insights/:userId | Get insights |

---

## 4 Frontend Pages

| Tab | Purpose |
|-----|---------|
| ✍️ Write | Create entry |
| 📖 View | See entries |
| 🔍 Analyze | Check emotion |
| 📊 Insights | View trends |

---

## Documentation

| File | Content | Time |
|------|---------|------|
| [QUICKSTART.md](QUICKSTART.md) | Get running | 5 min |
| [README.md](README.md) | Full guide | 20 min |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Design | 30 min |
| [TESTING.md](TESTING.md) | Tests | 15 min |
| [INDEX.md](INDEX.md) | Navigation | 5 min |

---

## Test Emotion Analysis

### Create Entry
```bash
curl -X POST http://localhost:5000/api/journal \
  -H "Content-Type: application/json" \
  -d '{"userId":"user1","ambience":"forest","text":"I felt calm"}'
```

### Analyze
```bash
curl -X POST http://localhost:5000/api/journal/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"I felt calm listening to rain"}'
```

Expected:
```json
{
  "emotion": "calm",
  "keywords": ["rain", "calm"],
  "summary": "...",
  "cached": false
}
```

---

## Common Issues

| Issue | Fix |
|-------|-----|
| Port 5000 in use | Change PORT in .env |
| npm install fails | Delete node_modules, try again |
| Can't connect | Ensure backend running on 5000 |
| Database error | Delete journal.db, restart |
| Frontend blank | Clear cache, hard refresh (Ctrl+Shift+R) |

---

## What You Have

✅ 4 working API endpoints  
✅ React frontend (all 4 tabs)  
✅ SQLite database  
✅ Real emotion analysis  
✅ Intelligent caching  
✅ Complete documentation  
✅ Docker support  
✅ Test plan included  

---

## Immediate Next Steps

1. **Run**: `setup.bat` (or `setup.sh`)
2. **Test**: Open `http://localhost:3000`
3. **Create**: Journal entry
4. **Analyze**: Check emotion
5. **Submit**: ZIP folder to Internshala

---

## Files Included

```
backend/
  ├── server.js          (4 API endpoints)
  ├── database.js        (SQLite)
  ├── llmService.js      (Real analysis)
  └── ...
  
frontend/
  ├── src/App.js         (4 tabs)
  ├── src/App.css        (Styling)
  └── ...

Documentation (7 files)
```

---

## Status

✅ **Complete**  
✅ **Tested**  
✅ **Ready**  

**Deadline**: March 15, 2026  
**Time left**: 2 days ✨

---

## Need Help?

1. Read [QUICKSTART.md](QUICKSTART.md)
2. Check [TESTING.md](TESTING.md)
3. Review [README.md](README.md)
4. See [INDEX.md](INDEX.md) for full guide

---

**Everything is ready! Just run `setup.bat` and enjoy! 🎉**
