chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_STREAM_INFO') {
    // Find video elements or network requests for `.m3u8` files
    const videoElement = document.querySelector('video');
    
    if (videoElement?.src.includes('.m3u8')) {
      sendResponse({ url: videoElement.src });
    } else {
      sendResponse({ url: null });
    }
  }
});
