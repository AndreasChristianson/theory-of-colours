import log from 'npmlog';
import { getWriteStream } from './index.js';

export const closeFile = async () =>
  new Promise((resolve, reject) => {
    const tracker = log.newItem('closing file');

    getWriteStream().once('error', reject);

    getWriteStream().once('close', () => {
      tracker.silly('File write stream closed');
      tracker.finish();
      resolve();
    });

    tracker.silly('Closing file write stream');
    getWriteStream().end();
  });
