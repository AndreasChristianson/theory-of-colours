import fs from 'fs';
import log from 'npmlog';
import { getOptions } from '../options/arguments.js';
import { setWriteStream } from './index.js';

export const openFile = async () =>
  new Promise((resolve, reject) => {
    const tracker = log.newItem('opening file');
    tracker.silly('Opening file', getOptions().file);

    const writeStream = fs.createWriteStream(getOptions().file, {
      flags: 'wx',
    });

    writeStream.once('error', reject);

    writeStream.once('ready', () => {
      tracker.silly('File opened', getOptions().file);
      tracker.finish();
      setWriteStream(writeStream);
      resolve(writeStream);
    });
  });
