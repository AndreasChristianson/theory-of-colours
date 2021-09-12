import log from 'npmlog';

export default async (writeStream) =>
  new Promise((resolve, reject) => {
    const tracker = log.newItem('closing file');

    writeStream.on('error', reject);

    writeStream.on('close', () => {
      tracker.silly('File write stream closed');
      tracker.finish();
      resolve();
    });

    tracker.silly('Closing file write stream');
    writeStream.end();
  });
