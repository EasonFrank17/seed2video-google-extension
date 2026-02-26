// Background service worker for API calls
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-v3.2';

const SYSTEM_PROMPT = `You are an expert AI video prompt converter. Your task is to convert simple scene descriptions into high-quality, structured English prompts optimized for AI video generation tools like Seed2Video.

Guidelines:
1. Convert the input (regardless of language) to vivid, descriptive English
2. Add cinematic quality descriptors: lighting, atmosphere, camera angles
3. Include technical quality terms: 4K, ultra-detailed, cinematic color grade, etc.
4. Keep prompts concise but descriptive (50-150 words)
5. Output ONLY the prompt, no explanations or quotes

Example transformations:
- "一个女孩在咖啡馆看书，下午阳光很好" → "Young woman reading in a cozy cafe, warm afternoon sunlight streaming through window, soft bokeh, cinematic color grade, 4K, ultra-detailed, peaceful atmosphere"
- "夜晚的城市街道，雨中霓虹灯" → "Night city street in rain, neon lights reflecting on wet pavement, cyberpunk atmosphere, cinematic lighting, 4K, ultra-detailed, moody"
- "一只猫在窗台上晒太阳" → "Cat basking in sunlight on windowsill, peaceful morning light, soft fur, relaxed atmosphere, warm color grade, 4K, cozy home setting"`;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertPrompt') {
    handleConvertPrompt(request.text, sendResponse);
    return true; // Keep the message channel open for async response
  }
});

async function handleConvertPrompt(userText, sendResponse) {
  try {
    // Get API key from storage
    const result = await chrome.storage.local.get(['apiKey']);
    const apiKey = result.apiKey;

    if (!apiKey) {
      sendResponse({
        success: false,
        error: 'Please set your OpenRouter API key in Settings first!'
      });
      return;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://seed2video.com',
        'X-Title': 'Video Script to Prompt Converter'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userText
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      sendResponse({
        success: false,
        error: `API Error: ${response.status}. ${errorText.substring(0, 200)}`
      });
      return;
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      sendResponse({
        success: false,
        error: 'Invalid API response format'
      });
      return;
    }

    const prompt = data.choices[0].message.content.trim();
    sendResponse({ success: true, prompt: prompt });

  } catch (error) {
    console.error('Error in handleConvertPrompt:', error);
    sendResponse({
      success: false,
      error: error.message || 'Unknown error occurred'
    });
  }
}

// Log when service worker is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Video Script to Prompt Converter installed');
});
