chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'download') {
    chrome.downloads.download({
      url: request.url,
      filename: request.filename,
      conflictAction: 'uniquify'
    });
  }
});

  
  chrome.webRequest.onResponseStarted.addListener(
    (details) => {
      if (details.url.includes('.m3u8')) {
        chrome.tabs.sendMessage(details.tabId, {
          type: 'HLS_DETECTED',
          url: details.url
        });
      }
    },
    { urls: ["<all_urls>"] }
  );
  