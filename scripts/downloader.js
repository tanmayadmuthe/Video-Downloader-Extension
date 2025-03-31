export class Downloader {
    static async downloadStream(url) {
      try {
        const chunks = await HLSProcessor.getChunks(url);
        const blobParts = await Promise.all(
          chunks.map(async chunkUrl => {
            const response = await fetch(chunkUrl);
            return await response.arrayBuffer();
          })
        );
        
        return new Blob(blobParts, { type: 'video/mp4' });
      } catch (error) {
        console.error('Download failed:', error);
        return null;
      }
    }
  }
  