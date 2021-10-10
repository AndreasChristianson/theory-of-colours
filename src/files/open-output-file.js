import fs from 'fs';
import log from 'npmlog';
import { getOptions } from '../options/arguments.js';
import { setWriteStream } from './index.js';

export const openOutputFile = async () =>
  new Promise((resolve, reject) => {
    log.silly('Opening file', getOptions().file);

    const writeStream = fs.createWriteStream(getOptions().file, {
      flags: 'wx',
    });

    writeStream.once('error', reject);

    writeStream.once('ready', () => {
      log.silly('File opened', getOptions().file);
      setWriteStream(writeStream);
      resolve(writeStream);
    });
  });
