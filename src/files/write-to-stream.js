import log from 'npmlog';
import { getWriteStream } from './index.js';

export const writeToStream = async (string, depth = 0) =>
  new Promise((resolve) => {
    const indent = '  '.repeat(depth);
    if (getWriteStream().write(`${indent}${string}\n`)) {
      resolve();
    } else {
      log.silly('fs buffer full. Pausing for drain event.');
      getWriteStream().once('drain', resolve);
    }
  });
