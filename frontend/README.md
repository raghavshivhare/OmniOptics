# OmniOptics Frontend

**Chrome Extension (Manifest V3) that provides ADHD-friendly text simplification on any webpage**

---

## 🎯 Overview

The frontend is a Chrome extension that serves as the "Presentation Tier" of OmniOptics. It provides an intuitive interface for users to select text on any webpage and receive AI-simplified versions optimized for ADHD readers.

---

## 🏗️ Architecture

### User Flow
```
Install Extension → welcome.html (First time only)
                          ↓
                    quiz.html (Educational onboarding)
                          ↓
                    popup.html (Main tool)
                          ↓
              Select text → Click button → Get simplified version
```

### Components

```
frontend/
├── manifest.json         # Extension configuration & permissions
├── background.js         # Service worker (manages lifecycle)
├── content.js           # Runs on webpages (gets selected text)
├── welcome.html/js/css  # Onboarding page
├── quiz.html/js         # Educational quiz
└── popup.html/js        # Main extension popup
```

---

## 📁 File Structure & Purpose

### Core Files

#### **manifest.json**
Extension configuration file that defines:
- Permissions (tabs, storage, scripting, all URLs)
- Content scripts (what runs on webpages)
- Background service worker
- Extension popup

#### **background.js**
Service worker that:
- Detects first-time installation
- Opens welcome page for new users
- Checks quiz completion status
- Runs in background (not visible to user)

#### **content.js**
Injected into every webpage to:
- Listen for messages from popup
- Grab text selected by user
- Send selected text back to popup
- Runs in webpage context (has access to DOM)

---

### User Interface Files

#### **welcome.html + welcome.js + welcome.css**
**Purpose**: First impression & onboarding

**Features**:
- Gradient background with animated particles
- Smooth button hover effects
- Haptic feedback on interaction
- Redirects to quiz

**When shown**: Only on first install (controlled by background.js)

---

#### **quiz.html + quiz.js**
**Purpose**: Educational onboarding about extension architecture

**Features**:
- 5 multiple-choice questions
- Animated progress bar
- Visual feedback (shake on wrong, pulse on correct)
- Saves completion to Chrome storage
- Only advances on correct answers

**Flow**:
1. User answers questions about 3-tier architecture
2. Wrong answer → Shake animation, try again
3. Correct answer → Green flash, next question
4. All correct → Redirect to popup.html
5. Saves `quizCompleted: true` flag

---

#### **popup.html + popup.js**
**Purpose**: Main extension interface (the actual tool)

**Features**:
- Button to simplify selected text
- Result area with scrollable content
- Loading states with spinner
- Success/error animations
- Custom scrollbar
- Helpful hints

**Workflow**:
1. User highlights text on any webpage
2. Clicks extension icon → Popup opens
3. Clicks "Simplify Selection" button
4. `popup.js` runs script on active tab to get selected text
5. Sends text to backend API (`POST /process`)
6. Displays simplified text from Gemini AI
7. Shows errors if backend is down or no text selected

---

## 🎨 Design System

### Colors
```css
Primary Gradient: #667eea → #764ba2 (Purple to Violet)
Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Text: #1a1a2e (Dark) / #64748b (Muted)
Success: #10b981 (Green)
Error: #ef4444 (Red)
Warning: #fbbf24 (Yellow)
```

### Animations
- **Fade In**: Smooth page transitions
- **Slide In**: Questions and options
- **Shake**: Wrong quiz answers
- **Pulse**: Loading states
- **Success Pulse**: Correct answers
- **Spin**: Loading spinners

### Typography
```css
Font Family: 'Inter', -apple-system, BlinkMacSystemFont
Headings: 24-28px, 700 weight
Body: 15-16px, 400-500 weight
Buttons: 15-16px, 600 weight
```

---

## 🔧 How It Works

### Text Selection Process

1. **User Action**: Highlights text on Wikipedia (or any site)

2. **Extension Click**: User clicks extension icon
   - Chrome opens `popup.html`
   - `popup.js` loads and attaches button listener

3. **Button Click**: User clicks "Simplify Selection"
   ```javascript
   // In popup.js
   chrome.tabs.query({active: true}) // Get current tab
   chrome.scripting.executeScript({  // Run code on page
     func: () => window.getSelection().toString()
   })
   ```

4. **Get Selected Text**: Uses Chrome Scripting API (not content.js)
   - More reliable than message passing
   - Direct execution on webpage

5. **Send to Backend**:
   ```javascript
   fetch("http://127.0.0.1:8000/process", {
     method: "POST",
     body: JSON.stringify({
       text: selectedText,
       profile: { style: "bullets", level: "easy" }
     })
   })
   ```

6. **Display Result**: Updates `#result` div with simplified text

---

## 🚀 Installation & Development

### Load Extension in Chrome

1. Open Chrome and go to: `chrome://extensions/`

2. Enable **Developer mode** (toggle in top-right corner)

3. Click **"Load unpacked"**

4. Navigate to and select the `frontend/` folder

5. Extension icon appears in toolbar!

### Making Changes

After editing any file:
1. Go to `chrome://extensions/`
2. Find "OmniOptics ADHD"
3. Click the reload icon 🔄
4. Changes are now live!

**Hot Tip**: For faster development, keep extensions page open in a pinned tab

---

## 🔐 Permissions Explained

```json
"permissions": [
  "tabs",      // Read URL and identify active tab
  "storage",   // Save quiz completion status
  "scripting"  // Execute code to grab selected text
],
"host_permissions": [
  "http://127.0.0.1:8000/*",  // Access local backend
  "<all_urls>"                 // Run on all websites
]
```

### Why `<all_urls>`?
- Allows extension to work on any website (Wikipedia, news sites, etc.)
- Without this, you'd get: "Cannot access contents of url" error
- Chrome will prompt user to approve this permission

---

## 📦 Chrome Storage Usage

### What's Stored
```javascript
chrome.storage.local.set({
  quizCompleted: true  // Boolean flag
})
```

### Why?
- Remembers if user completed onboarding quiz
- Prevents showing welcome page every time
- Stored locally in browser (not synced across devices)

### How to Reset (for testing)
```javascript
// Run in DevTools console
chrome.storage.local.clear()
```

---

## 🐛 Debugging Tips

### Open Extension DevTools

**For popup.html**:
1. Click extension icon
2. Right-click inside popup
3. Select "Inspect"

**For background.js**:
1. Go to `chrome://extensions/`
2. Find your extension
3. Click "service worker" link

**For content.js**:
1. Open any webpage
2. Press F12
3. Check Console tab for content script logs

### Common Issues

**"Cannot access contents of url"**
- Solution: Add `"<all_urls>"` to `host_permissions` in manifest.json
- Reload extension

**"Could not connect to Backend"**
- Solution: Make sure backend is running (`python main.py`)
- Check URL is `http://127.0.0.1:8000`

**Quiz appears every time**
- Solution: Check Chrome storage in DevTools
- Application → Storage → Local Storage → chrome-extension://...
- Should see `quizCompleted: true`

**No text selected error**
- Solution: Actually highlight text on the webpage first
- Make sure you're on a regular webpage (not chrome:// URLs)

---

## 🎯 ADHD-Friendly Design Principles

### 1. Single Focus
- One action per screen
- No overwhelming options
- Clear call-to-action

### 2. Immediate Feedback
- Button changes text instantly ("Processing...")
- Loading spinner appears immediately
- Haptic feedback (vibration) confirms clicks

### 3. Visual Hierarchy
- Bold headings
- Gradient accents draw attention
- Color coding (green=success, red=error)

### 4. Progress Indicators
- Progress bar in quiz shows completion
- Question counter ("Question 3 of 5")

### 5. Error Recovery
- Helpful error messages
- Tell user exactly what to do
- No cryptic technical jargon

### 6. Smooth Animations
- Nothing jarring or sudden
- Easing functions for natural motion
- Animations keep engagement high

---

## 🔄 State Management

### Quiz State
```javascript
let currentQ = 0;  // Which question (0-4)
questions[currentQ]  // Current question object

// Stored in file scope, resets on page reload
```

### Storage State
```javascript
chrome.storage.local.get(['quizCompleted'], (result) => {
  if (result.quizCompleted) {
    // User has completed quiz
  }
})
```

### UI State
```css
.loading   // During API call
.success   // API returned data
.error     // Something went wrong
```

---

## 📱 Responsive Design

Extension popup has fixed dimensions:
- **Width**: 450px
- **Min Height**: 300px
- **Max Height**: 600px (with scrolling)

Quiz and welcome pages open in full browser tabs:
- Responsive to window size
- Centered card layout
- Works on any screen size

---

## 🧪 Testing Checklist

- [ ] First install shows welcome page
- [ ] Quiz requires correct answers to proceed
- [ ] Quiz completion saves to storage
- [ ] Second install skips to popup directly
- [ ] Text selection works on Wikipedia
- [ ] Text selection works on news sites
- [ ] Loading state shows during API call
- [ ] Success state displays simplified text
- [ ] Error state shows when backend is down
- [ ] Error state shows when no text selected
- [ ] Button disables during processing
- [ ] Animations are smooth
- [ ] Scrollbar appears for long content

---

## 🚀 Future Enhancements

- [ ] Add settings page for customization
- [ ] Save user preferences (style, level)
- [ ] Add "Summarize Page" button for full webpage
- [ ] Implement dark mode
- [ ] Add keyboard shortcuts
- [ ] Save history of simplified texts
- [ ] Export as PDF/Markdown
- [ ] Support for other languages

---

## 📚 Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Chrome Scripting API](https://developer.chrome.com/docs/extensions/reference/scripting/)

---

**Frontend built with vanilla JavaScript for OmniOptics ADHD Focus Bridge**