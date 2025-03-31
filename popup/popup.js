document.addEventListener('DOMContentLoaded', () => {
    const qualitySelect = document.getElementById('qualitySelect');
    const downloadBtn = document.getElementById('downloadBtn');
    const status = document.getElementById('status');
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_STREAM_INFO' }, (response) => {
        if (response?.variants) {
          response.variants.forEach(variant => {
            const option = document.createElement('option');
            option.value = variant.url;
            option.textContent = variant.quality;
            qualitySelect.appendChild(option);
          });
        }
      });
    });
  
    downloadBtn.addEventListener('click', () => {
      const selectedUrl = qualitySelect.value;
      status.textContent = 'Starting download...';
      
      chrome.runtime.sendMessage({
        action: 'download',
        url: selectedUrl,
        filename: `video_${Date.now()}.mp4`
      }, (response) => {
        status.textContent = response.success 
          ? 'Download started!' 
          : 'Error starting download';
      });
    });
  });
  