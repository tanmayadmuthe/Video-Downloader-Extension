import { HLSProcessor } from '../scripts/hlsProcessor.js';
import { FFmpegWorker } from '../scripts/ffmpegWorker.js';

document.addEventListener('DOMContentLoaded', () => {
  const qualitySelect = document.getElementById('qualitySelect');
  const downloadBtn = document.getElementById('downloadBtn');
  const status = document.getElementById('status');

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_STREAM_INFO' }, async (response) => {
      if (response?.url) {
        const variants = await HLSProcessor.getVariants(response.url);
        variants.forEach(variant => {
          const option = document.createElement('option');
          option.value = variant.url;
          option.textContent = variant.quality;
          qualitySelect.appendChild(option);
        });
      }
    });
  });

  downloadBtn.addEventListener('click', async () => {
    const selectedUrl = qualitySelect.value;
    status.textContent = 'Downloading...';

    try {
      const chunks = await HLSProcessor.getChunks(selectedUrl);
      const videoBlobParts = await Promise.all(
        chunks.map(async (chunkUrl) => {
          const response = await fetch(chunkUrl);
          return await response.arrayBuffer();
        })
      );

      // Merge video and audio streams using FFmpegWorker
      const mergedVideoBlob = await FFmpegWorker.mergeStreams(videoBlobParts, []);
      
      // Download the final MP4 file
      const blobURL = URL.createObjectURL(new Blob([mergedVideoBlob], { type: 'video/mp4' }));
      chrome.runtime.sendMessage({
        action: 'download',
        url: blobURL,
        filename: `video_${Date.now()}.mp4`
      });

      status.textContent = 'Download started!';
    } catch (error) {
      console.error(error);
      status.textContent = 'Error during download.';
    }
  });
});
