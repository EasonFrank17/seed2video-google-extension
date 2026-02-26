# Video Script to Prompt Converter

A Chrome extension that converts simple scene descriptions (in any language) into professional, structured prompts for AI video generation tools.

## Features

- 🌍 **Multi-language Support**: Input in Chinese, English, or any language
- ✨ **AI-Powered Conversion**: Uses DeepSeek AI to generate professional video prompts
- 🎥 **Optimized for Seed2Video**: Works perfectly with seed2video.com and other AI video tools
- ⚡ **Real-time Streaming**: See your prompt being generated in real-time
- 📋 **Auto Copy**: Generated prompts are automatically copied to clipboard
- 💡 **Quick Examples**: Built-in examples to get you started

## Installation

### Option 1: Load as Unpacked Extension (For Development/Testing)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the extension folder containing manifest.json
5. The extension icon will appear in your Chrome toolbar

### Option 2: Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon.

## How to Use

1. Click the extension icon in your Chrome toolbar
2. Enter your video scene description in the input box
   - Example (Chinese): `一个女孩在咖啡馆看书，下午阳光很好`
   - Example (English): `a girl reading in a cafe, beautiful afternoon light`
3. Click "Convert to Prompt" or press Enter
4. Wait for the AI to generate your professional video prompt
5. The prompt is automatically copied to your clipboard
6. Click "Generate Video" to open Seed2Video and create your video

## Example Transformations

**Input:** `一个女孩在咖啡馆看书，下午阳光很好`

**Output:** `Young woman reading in a cozy cafe, warm afternoon sunlight streaming through window, soft bokeh background, cinematic color grade, 4K, ultra-detailed, peaceful atmosphere`

---

**Input:** `夜晚的城市街道，雨中霓虹灯`

**Output:** `Night city street in rain, neon lights reflecting on wet pavement, cyberpunk atmosphere, cinematic lighting, 4K, ultra-detailed, moody`

---

**Input:** `一只猫在窗台上晒太阳`

**Output:** `Cat basking in sunlight on windowsill, peaceful morning light, soft fur, relaxed atmosphere, warm color grade, 4K, cozy home setting`

## Chrome Web Store Description

```
Struggling to write prompts for AI video tools?

This extension helps you turn simple scene descriptions into structured prompts that work better with AI video generators. Type what you want in plain English (or any language), and get a formatted prompt you can use directly.

Optimized for use with Seed2Video (seed2video.com), but works with any AI video tool.

Features:
✓ Convert casual ideas to professional prompts
✓ Supports any language (Chinese, English, etc.)
✓ Real-time AI-powered generation
✓ Auto-copy to clipboard
✓ Built-in examples
✓ One-click access to Seed2Video

Perfect for content creators, marketers, and anyone using AI video generation tools!
```

## Technical Details

- **Manifest Version**: 3
- **AI Model**: DeepSeek v3.2 via OpenRouter API
- **Permissions Required**:
  - `clipboardWrite`: To automatically copy generated prompts
  - `https://openrouter.ai/*`: To access the AI API

## Privacy

- Your input text is sent to OpenRouter API for prompt generation
- No data is stored or tracked by this extension
- API calls are made directly from your browser

## Support

For issues or feature requests, please visit: [seed2video.com](https://seed2video.com)

## License

This extension is optimized for Seed2Video but can be used with any AI video generation tool.
