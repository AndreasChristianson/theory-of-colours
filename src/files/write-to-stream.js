import log from 'npmlog';
import { getWriteStream } from './index.js';

export const writeToStream = async (string) =>
  new Promise((resolve) => {
    if (getWriteStream().write(`${string}\n`)) {
      resolve();
    } else {
      log.silly('fs buffer full. Pausing for drain event.');
      getWriteStream().once('drain', resolve);
    }
  });
