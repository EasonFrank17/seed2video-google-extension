# Installation & Testing Guide

## Quick Start

### Step 1: Load Extension in Chrome

1. Open Chrome browser
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select this folder: `/Users/Zhuanz/Desktop/seed2video google extension`
6. The extension icon will appear in your toolbar

### Step 2: Test the Extension

1. Click the extension icon in Chrome toolbar
2. You should see a popup with:
   - Input textarea (for your video idea)
   - "Convert to Prompt" button
   - Three example buttons at the bottom

### Step 3: Try It Out

**Option A: Use an example**
- Click any of the example buttons (e.g., "一个女孩在咖啡馆看书，下午阳光很好")
- The conversion will start automatically

**Option B: Enter your own text**
- Type your video idea in the input box
- Click "Convert to Prompt" or press Ctrl+Enter
- Wait 2-3 seconds for the AI to generate the prompt

### Expected Results

**Input:** `一个女孩在咖啡馆看书，下午阳光很好`

**Output:** Something like:
```
Young woman reading in a cozy cafe, warm afternoon sunlight streaming through window, soft bokeh background, cinematic color grade, 4K, ultra-detailed, peaceful atmosphere
```

The generated prompt will:
- Appear in the output textarea
- Be automatically ready to copy
- Have a "Copy" button and "Seed2Video" link

## Troubleshooting

### If nothing happens when clicking "Convert to Prompt":

1. **Check the Console**
   - Right-click the extension popup
   - Select "Inspect"
   - Look for errors in the Console tab

2. **Check Background Script**
   - Go to `chrome://extensions/`
   - Find "Video Script to Prompt Converter"
   - Click "service worker" link
   - Check for errors in the console

3. **Common Issues:**

   - **CORS Error**: The background service worker should handle this
   - **API Key Error**: Check if the API key in `background.js` is valid
   - **Network Error**: Check your internet connection
   - **Permission Error**: Make sure `host_permissions` is in manifest.json

### Error Messages to Watch For:

- "Extension error": Problem with Chrome extension messaging
- "API Error": Problem with OpenRouter API (check API key)
- "Invalid API response": API returned unexpected format
- "Failed to generate prompt": Generic error (check console for details)

## File Structure

```
seed2video google extension/
├── manifest.json       # Extension configuration
├── background.js       # Background service worker (handles API)
├── popup.html         # UI layout and styles
├── popup.js           # UI logic and Chrome messaging
├── icons/             # Extension icons
├── README.md          # Full documentation
└── INSTALL.md         # This file
```

## How It Works

1. **User enters text** in popup.html
2. **popup.js** sends message to background.js via `chrome.runtime.sendMessage()`
3. **background.js** calls OpenRouter API with DeepSeek model
4. **API response** is sent back to popup.js
5. **popup.js** displays the result in the output textarea

## API Details

- **Provider**: OpenRouter (https://openrouter.ai)
- **Model**: DeepSeek v3.2 (`deepseek/deepseek-v3.2`)
- **API Key**: Configured in `background.js`
- **Request**: Sends user text + system prompt
- **Response**: Optimized video generation prompt

## Next Steps

After testing:
1. If it works: Ready to use!
2. If there are errors: Check console logs
3. For production: Consider adding error analytics
4. For Chrome Web Store: Need to prepare icons, screenshots, and store listing

## Support

If you encounter issues:
1. Check console logs (both popup and background)
2. Verify internet connection
3. Test API key directly with curl
4. Check OpenRouter API status
