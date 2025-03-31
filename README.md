# Video Stream Downloader Chrome Extension
A powerful Chrome extension that allows users to download videos from HLS (.m3u8) and other streaming platforms. The extension detects video streams, provides quality selection, and downloads the video directly to your device as an MP4 file.

## Features
- Detects HLS (.m3u8) video streams on web pages.
- Supports downloading video chunks and merging them into a single MP4 file.
- Provides quality selection for adaptive streams (e.g., 1080p, 720p, etc.).
- Uses a proxy server to bypass CORS restrictions.
- Merges video and audio streams using FFmpeg (via WebAssembly).
- Simple and user-friendly popup interface.

## Directory Structure
```
video-downloader-extension/
├── manifest.json               # Chrome extension manifest file
├── background.js               # Background script for handling downloads
├── popup/
│   ├── popup.html              # Popup UI
│   ├── popup.js                # Popup logic
│   ├── popup.css               # Popup styles
├── content/
│   ├── content.js              # Content script for detecting video streams
├── scripts/
│   ├── hlsProcessor.js         # Handles HLS (.m3u8) processing
│   ├── downloader.js           # Handles chunk downloads
│   ├── ffmpegWorker.js         # Merges video and audio using FFmpeg.wasm
│   ├── proxyServer.js          # Proxy server to bypass CORS restrictions
├── assets/
│   ├── icon.png                # Extension icon
│   ├── styles.css              # Shared styles (if needed)
```

## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/video-stream-downloader.git
cd video-stream-downloader
```

### 2. Set Up the Proxy Server
The extension uses a proxy server to bypass CORS restrictions. Install dependencies and start the server:
```bash
cd scripts
npm install express cors node-fetch
node proxyServer.js
```
The proxy server will run at `http://localhost:3000`.

### 3. Load the Extension
1. Open Chrome and go to `chrome://extensions/`.
2. Enable Developer Mode (toggle in the top-right corner).
3. Click **Load Unpacked** and select the root folder of this project.

## Usage
1. Navigate to a website with an HLS stream (e.g., `.m3u8` files).
2. Click on the extension icon in the Chrome toolbar.
3. Select the desired video quality from the dropdown menu.
4. Click **Download** to start downloading the video.
5. The merged MP4 file will be saved in your default downloads folder.

## Technical Details
### HLS Processing
- The extension fetches `.m3u8` playlists via a proxy server to avoid CORS issues.
- It parses playlists to extract video chunk URLs for downloading.

### Video Merging
- Uses `FFmpeg.wasm` to merge video and audio streams into a single MP4 file.

### Proxy Server
- A lightweight Node.js server is used to fetch `.m3u8` files and video chunks, bypassing browser CORS restrictions.

## Limitations
- Does not support DRM-protected content (e.g., Widevine, PlayReady).
- Proxy server must be running locally for the extension to work.
- May not work on all streaming platforms due to custom implementations or encryption.
- Large files may take longer due to browser memory limitations.

## Future Improvements
- Add support for MPEG-DASH streams (`.mpd` files).
- Implement progress tracking for downloads.
- Improve UI with real-time status updates.
- Add support for encrypted HLS streams (if legally permissible).
- Optimize performance for large video files.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Disclaimer
This extension is intended for personal use only. Ensure you comply with copyright laws and website terms of service when using this tool.
