# OmniOptics - ADHD Focus Bridge

**A Chrome Extension powered by Gemini AI to help ADHD users simplify and process complex text on any webpage.**

---

## 🎯 Overview

OmniOptics (FocusFlow) is a Chrome extension designed with ADHD-friendly principles to transform dense, overwhelming text into scannable, digestible content. Users can highlight any text on a webpage and get an AI-simplified version with bullet points, bold keywords, and reduced cognitive load.

### Key Features

- ✨ **Text Simplification**: Select any text and get an ADHD-friendly version
- 🧠 **Gemini AI Integration**: Powered by Google's Gemini 1.5 Flash model
- 🎨 **Modern UI**: Gradient design with smooth animations and micro-interactions
- 📚 **Educational Quiz**: Interactive onboarding to teach extension architecture
- 💾 **Smart Storage**: Remembers quiz completion status
- 🚀 **Fast Processing**: Local backend ensures quick response times

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   PRESENTATION TIER                  │
│  (Chrome Extension - HTML/CSS/JS)                   │
│                                                      │
│  welcome.html → quiz.html → popup.html              │
│  (Onboarding)   (Quiz)       (Main Tool)            │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ HTTP POST /process
                  ▼
┌─────────────────────────────────────────────────────┐
│                    LOGIC TIER                        │
│  (FastAPI Backend - Python)                         │
│                                                      │
│  main.py → ai_service.py                            │
│  (API)      (AI Logic)                              │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ API Call
                  ▼
┌─────────────────────────────────────────────────────┐
│                    DATA TIER                         │
│  (Google Gemini AI)                                 │
│                                                      │
│  Gemini 1.5 Flash Model                             │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js (optional, for development)
- Chrome Browser
- Google Gemini API Key ([Get one here](https://ai.google.dev/))

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/OmniOptics.git
cd OmniOptics
```

### 2. Set Up Backend

```bash
cd backend

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start the server
python main.py
```

Backend will run at `http://127.0.0.1:8000`

### 3. Load Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `frontend/` folder
5. Extension icon will appear in your toolbar!

### 4. Test It Out

1. Click the extension icon to start onboarding
2. Complete the 5-question quiz
3. Go to any webpage (e.g., Wikipedia)
4. Highlight some text
5. Click extension icon → "Simplify Selection"
6. Watch the AI transform your text! ✨

---

## 📁 Project Structure

```
OmniOptics/
├── README.md                 # This file
├── backend/
│   ├── README.md            # Backend documentation
│   ├── main.py              # FastAPI server
│   ├── ai_service.py        # Gemini AI integration
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # API keys (create this)
│   └── test_api.py          # API tests
├── frontend/
│   ├── README.md            # Frontend documentation
│   ├── manifest.json        # Extension configuration
│   ├── background.js        # Background service worker
│   ├── content.js           # Content script for text selection
│   ├── welcome.html/js/css  # Onboarding page
│   ├── quiz.html/js         # Educational quiz
│   └── popup.html/js        # Main extension popup
```

---

## 🔧 Technologies Used

### Frontend
- **Chrome Extension API** (Manifest V3)
- **Vanilla JavaScript** (No frameworks - lightweight!)
- **CSS3** (Animations, gradients, glassmorphism)
- **Chrome Storage API** (User preferences)

### Backend
- **FastAPI** (Modern Python web framework)
- **Google Gemini AI** (1.5 Flash model)
- **Uvicorn** (ASGI server)
- **Python-dotenv** (Environment variables)
- **Pydantic** (Data validation)

---

## 🎨 Design Principles (ADHD-Friendly)

1. **Single Focus**: One action per screen
2. **Immediate Feedback**: Visual/haptic response to every interaction
3. **Progress Indicators**: Always show where user is in a process
4. **Reduced Cognitive Load**: Simplified language, bullet points, bold keywords
5. **Smooth Animations**: Maintain engagement without distraction
6. **Clear Error Messages**: Tell users exactly what went wrong and how to fix it

---

## 📊 API Endpoints

### Health Check
```bash
GET http://127.0.0.1:8000/health
```

### Process Text
```bash
POST http://127.0.0.1:8000/process
Content-Type: application/json

{
  "text": "Your complex text here...",
  "profile": {
    "style": "bullets",
    "level": "easy"
  }
}
```

### Interactive API Docs
Visit `http://127.0.0.1:8000/docs` when backend is running for Swagger UI

---

## 🐛 Troubleshooting

### Backend Issues

**"API Key missing"**
- Create `.env` file in `backend/` folder
- Add: `GEMINI_API_KEY=your_actual_key`

**"ModuleNotFoundError"**
- Run: `pip install -r requirements.txt`

**"Port already in use"**
- Kill existing process or change port in `main.py`

### Extension Issues

**"Cannot access contents of url"**
- Make sure manifest.json has `"host_permissions": ["<all_urls>"]`
- Reload extension in chrome://extensions

**"Could not connect to Backend"**
- Ensure backend is running: `python main.py`
- Check that URL is `http://127.0.0.1:8000`

**Quiz not appearing**
- Clear Chrome storage: Dev Tools → Application → Storage → Clear site data
- Reload extension

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - feel free to use this project for learning or building your own tools!

---

## 🙏 Acknowledgments

- Google Gemini AI for powerful text processing
- Chrome Extensions documentation
- ADHD community for design insights

---

**Built with ❤️ for better focus and learning**