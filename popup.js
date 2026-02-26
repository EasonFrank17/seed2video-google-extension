// DOM elements
const inputEl = document.getElementById('input');
const convertBtn = document.getElementById('convertBtn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const outputSection = document.getElementById('outputSection');
const outputEl = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const examples = document.querySelectorAll('.example');

// Settings elements
const settingsHeader = document.querySelector('.settings-header');
const settingsContent = document.getElementById('settingsContent');
const toggleSettingsBtn = document.getElementById('toggleSettings');
const apiKeyInput = document.getElementById('apiKeyInput');
const toggleApiKeyBtn = document.getElementById('toggleApiKey');
const saveApiKeyBtn = document.getElementById('saveApiKey');
const saveStatus = document.getElementById('saveStatus');

// Event listeners
convertBtn.addEventListener('click', handleConvert);
copyBtn.addEventListener('click', handleCopy);

// Settings event listeners
settingsHeader.addEventListener('click', toggleSettings);
toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);
saveApiKeyBtn.addEventListener('click', saveApiKey);

// Handle Enter key in textarea
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    handleConvert();
  }
});

// Handle example clicks
examples.forEach(example => {
  example.addEventListener('click', () => {
    const text = example.getAttribute('data-text');
    inputEl.value = text;
    handleConvert();
  });
});

// Main conversion function
async function handleConvert() {
  const text = inputEl.value.trim();

  if (!text) {
    showError('Please enter your video idea first!');
    return;
  }

  // Reset UI
  hideError();
  hideOutput();
  showLoading();
  convertBtn.disabled = true;

  try {
    // Send message to background script
    chrome.runtime.sendMessage(
      { action: 'convertPrompt', text: text },
      (response) => {
        hideLoading();
        convertBtn.disabled = false;

        if (chrome.runtime.lastError) {
          showError('Extension error: ' + chrome.runtime.lastError.message);
          console.error('Chrome runtime error:', chrome.runtime.lastError);
          return;
        }

        if (response.success) {
          showOutput(response.prompt);
        } else {
          showError(response.error || 'Failed to generate prompt. Please try again.');
          console.error('API error:', response.error);
        }
      }
    );
  } catch (error) {
    hideLoading();
    convertBtn.disabled = false;
    showError('Unexpected error: ' + error.message);
    console.error('Error in handleConvert:', error);
  }
}

// Copy to clipboard
function handleCopy() {
  const text = outputEl.value;

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = '✓ Copied!';
    copyBtn.classList.add('success');

    setTimeout(() => {
      copyBtn.textContent = '📋 Copy';
      copyBtn.classList.remove('success');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    showError('Failed to copy to clipboard');
  });
}

// UI helper functions
function showLoading() {
  loadingEl.classList.add('show');
}

function hideLoading() {
  loadingEl.classList.remove('show');
}

function showOutput(prompt) {
  outputEl.value = prompt;
  outputSection.classList.add('show');
}

function hideOutput() {
  outputSection.classList.remove('show');
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.add('show');
}

function hideError() {
  errorEl.classList.remove('show');
}

// Settings functions
function toggleSettings() {
  const isHidden = settingsContent.classList.toggle('hidden');
  toggleSettingsBtn.textContent = isHidden ? '+' : '−';
}

function toggleApiKeyVisibility() {
  if (apiKeyInput.type === 'password') {
    apiKeyInput.type = 'text';
    toggleApiKeyBtn.textContent = '🙈';
  } else {
    apiKeyInput.type = 'password';
    toggleApiKeyBtn.textContent = '👁️';
  }
}

async function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();

  // Clear previous status
  saveStatus.textContent = '';
  saveStatus.className = 'save-status';

  // Validate API key format
  if (!apiKey) {
    showSaveStatus('Please enter an API key', 'error');
    return;
  }

  if (!apiKey.startsWith('sk-or-v1-')) {
    showSaveStatus('Invalid API key format. Should start with "sk-or-v1-"', 'error');
    return;
  }

  try {
    // Save to chrome storage
    await chrome.storage.local.set({ apiKey: apiKey });
    showSaveStatus('API key saved successfully!', 'success');

    // Auto-collapse settings after 2 seconds
    setTimeout(() => {
      settingsContent.classList.add('hidden');
      toggleSettingsBtn.textContent = '+';
    }, 2000);
  } catch (error) {
    showSaveStatus('Failed to save API key: ' + error.message, 'error');
  }
}

function showSaveStatus(message, type) {
  saveStatus.textContent = message;
  saveStatus.className = `save-status ${type}`;
}

// Load saved API key on popup open
async function loadSavedApiKey() {
  try {
    const result = await chrome.storage.local.get(['apiKey']);
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
      // Start with settings collapsed if API key exists
      settingsContent.classList.add('hidden');
      toggleSettingsBtn.textContent = '+';
    }
  } catch (error) {
    console.error('Failed to load API key:', error);
  }
}

// Load saved input on popup open (optional)
window.addEventListener('load', () => {
  loadSavedApiKey();

  chrome.storage.local.get(['lastInput'], (result) => {
    if (result.lastInput) {
      inputEl.value = result.lastInput;
    }
  });
});

// Save input when typing (debounced)
let saveTimeout;
inputEl.addEventListener('input', () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    chrome.storage.local.set({ lastInput: inputEl.value });
  }, 500);
});
