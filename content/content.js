chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_STREAM_INFO') {
      const videoElement = document.querySelector('video');
      const streams = [];
  
      if (videoElement?.src) {
        streams.push({
          url: videoElement.src,
          quality: 'Default'
        });
      }
  
      sendResponse({ variants: streams });
    }
  });
  