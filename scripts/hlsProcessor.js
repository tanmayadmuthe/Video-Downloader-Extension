export class HLSProcessor {
  static async getVariants(masterUrl) {
    try {
      const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(masterUrl)}`;
      const response = await fetch(proxyUrl);
      const playlist = await response.text();

      return playlist.split('\n')
        .filter(line => line.endsWith('.m3u8'))
        .map(line => ({
          url: new URL(line, masterUrl).href,
          quality: line.match(/(\d+)p/)?.pop() || 'unknown'
        }));
    } catch (error) {
      console.error('HLS processing error:', error);
      return [];
    }
  }

  static async getChunks(playlistUrl) {
    const proxyUrl = `http://localhost:3000/proxy?url=${encodeURIComponent(playlistUrl)}`;
    const response = await fetch(proxyUrl);
    const mediaPlaylist = await response.text();

    return mediaPlaylist.split('\n')
      .filter(line => line.startsWith('http'))
      .map(line => new URL(line, playlistUrl).href);
  }
}
