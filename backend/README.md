# OmniOptics Backend

**FastAPI server that processes text using Google Gemini AI for ADHD-friendly simplification**

---

## 🎯 Purpose

This backend serves as the "Logic Tier" of the OmniOptics extension. It receives text from the Chrome extension, sends it to Google's Gemini AI for processing, and returns simplified, ADHD-friendly content.

---

## 🏗️ Architecture

```
Chrome Extension → FastAPI Server → Gemini AI → Simplified Text
                   (main.py)        (ai_service.py)
```

### Components

1. **main.py**: FastAPI application with CORS, health checks, and API endpoints
2. **ai_service.py**: Gemini AI integration and prompt engineering
3. **requirements.txt**: Python dependencies
4. **.env**: Environment variables (API keys)

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Google Gemini API Key ([Get one here](https://ai.google.dev/))

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend/` directory:
   ```bash
   echo "GEMINI_API_KEY=your_actual_api_key_here" > .env
   ```
   
   Or manually create `.env` with:
   ```
   GEMINI_API_KEY=AIzaSy...your_key_here
   ```

5. **Run the server**
   ```bash
   python main.py
   ```
   
   Server will start at: `http://127.0.0.1:8000`

---

## 📁 File Structure

```
backend/
├── README.md              # This file
├── main.py                # FastAPI application (API endpoints)
├── ai_service.py          # Gemini AI service (AI logic)
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (create this)
├── test_api.py           # API testing script
└── venv/                  # Virtual environment (created by you)
```

---

## 🔌 API Endpoints

### 1. Health Check
**Endpoint**: `GET /health`

**Purpose**: Verify server is running

**Response**:
```json
{
  "status": "The Bridge is active"
}
```

**Example**:
```bash
curl http://127.0.0.1:8000/health
```

---

### 2. Process Text
**Endpoint**: `POST /process`

**Purpose**: Simplify text for ADHD users

**Request Body**:
```json
{
  "text": "Machine learning is a method of data analysis that automates analytical model building...",
  "profile": {
    "style": "bullets",
    "level": "easy"
  }
}
```

**Response** (Success):
```json
{
  "status": "success",
  "data": "**Machine Learning** = Teaching computers to learn from data\n\n• No human programming needed\n• Finds patterns automatically\n• Makes decisions on its own"
}
```

**Response** (Error):
```json
{
  "status": "error",
  "detail": "An internal error occurred."
}
```

**Example**:
```bash
curl -X POST http://127.0.0.1:8000/process \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Quantum mechanics is a fundamental theory in physics.",
    "profile": {"style": "bullets", "level": "easy"}
  }'
```

---

## 📚 Interactive API Documentation

FastAPI automatically generates interactive API docs:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

These allow you to test endpoints directly in your browser!

---

## 🧪 Testing

### Run Test Script

```bash
python test_api.py
```

This will:
1. Test direct Gemini API connection
2. Test edge cases (short text, empty text)
3. Provide curl commands for manual testing

### Manual Testing with curl

**Health Check**:
```bash
curl http://127.0.0.1:8000/health
```

**Process Text**:
```bash
curl -X POST http://127.0.0.1:8000/process \
  -H "Content-Type: application/json" \
  -d '{"text": "Python is a programming language.", "profile": {"style": "bullets", "level": "easy"}}'
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

### Server Settings

**Default Configuration** (in `main.py`):
- Host: `127.0.0.1` (localhost only)
- Port: `8000`
- Reload: `False` (change to `True` for development)

**To change port or host**:
```python
# In main.py at the bottom
uvicorn.run(app, host="0.0.0.0", port=8080)  # Example: allow external access
```

---

## 🔐 Security Notes

1. **CORS Configuration**: Currently allows all origins (`"*"`) for development
   - For production, restrict to specific domains:
     ```python
     allow_origins=["chrome-extension://your-extension-id"]
     ```

2. **API Key**: Never commit `.env` file to version control
   - Already in `.gitignore`
   - Rotate keys regularly

3. **Rate Limiting**: Consider adding rate limiting for production
   ```bash
   pip install slowapi
   ```

---

## 🛠️ Dependencies

```
fastapi==0.115.0          # Web framework
uvicorn==0.32.0          # ASGI server
pydantic==2.9.2          # Data validation
python-dotenv==1.0.1     # Environment variables
google-genai==1.0.0      # Gemini AI SDK
```

---

## 🐛 Troubleshooting

### "API Key missing! Check your .env file"
- Ensure `.env` file exists in `backend/` directory
- Verify it contains: `GEMINI_API_KEY=your_key`
- No quotes needed around the key
- No spaces before/after `=`

### "ModuleNotFoundError: No module named 'fastapi'"
```bash
pip install -r requirements.txt
```

### "Address already in use"
- Another process is using port 8000
- Kill existing process or change port in `main.py`
```bash
# Find process using port 8000
lsof -i :8000
# Kill it
kill -9 <PID>
```

### "Could not process this content"
- Text might be too short (< 10 characters)
- Text might be blocked by AI safety filters
- Check Gemini API quota/limits

### CORS Errors from Extension
- Verify `allow_origins=["*"]` in `main.py`
- Check that backend is running
- Ensure extension has correct backend URL

---

## 📈 Performance

- **Average Response Time**: 1-3 seconds
- **Model**: Gemini 1.5 Flash (optimized for speed)
- **Concurrent Requests**: Handled by Uvicorn's async capabilities

---

## 🔄 Development Mode

For auto-reload on code changes:

```python
# In main.py
uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
```

Or run directly with uvicorn:
```bash
uvicorn main:app --reload
```

---

## 📝 API Design Principles

1. **Simple Request/Response**: Clean JSON structure
2. **Error Handling**: Always return status + message
3. **CORS Enabled**: Works with Chrome extensions
4. **Validation**: Pydantic models ensure data integrity
5. **Async/Await**: Non-blocking operations

---

## 🚀 Future Enhancements

- [ ] Add user preference storage
- [ ] Implement caching for repeated text
- [ ] Add rate limiting
- [ ] Support multiple AI models
- [ ] Add text chunking for very long content
- [ ] Implement user authentication

---

**Backend maintained for OmniOptics ADHD Focus Bridge**