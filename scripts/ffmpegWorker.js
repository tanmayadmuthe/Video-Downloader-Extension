import { createFFmpeg } from '@ffmpeg/ffmpeg';

export class FFmpegWorker {
  static async mergeStreams(videoData, audioData) {
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS('writeFile', 'video.ts', new Uint8Array(videoData));
    ffmpeg.FS('writeFile', 'audio.ts', new Uint8Array(audioData));

    await ffmpeg.run('-i', 'video.ts', '-i', 'audio.ts', '-c:v', 'copy', '-c:a', 'aac', 'output.mp4');
    
    const output = ffmpeg.FS('readFile', 'output.mp4');
    return output;
  }
}
