import fs from 'fs';
import log from 'npmlog';

export default async (fileName) =>
  new Promise((resolve, reject) => {
    const tracker = log.newItem('opening file');
    tracker.silly('Opening file', fileName);

    const writeStream = fs.createWriteStream(fileName, {
      flags: 'wx',
    });

    writeStream.once('error', reject);

    writeStream.once('ready', () => {
      tracker.silly('File opened', fileName);
      tracker.finish();
      resolve(writeStream);
    });
  });
