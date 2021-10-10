import log from 'npmlog';
import { getWriteStream } from './index.js';

export const closeOutputStream = async () =>
  new Promise((resolve, reject) => {

    getWriteStream().once('error', reject);

    getWriteStream().once('close', () => {
      log.silly('File write stream closed');
      resolve();
    });

    log.silly('Closing file write stream');
    getWriteStream().end();
  });
