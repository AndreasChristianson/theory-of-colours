import log from 'npmlog';
import { getOptions } from './options/arguments.js';

process.on('unhandledRejection', (err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(-1);
});

export const setupLogging = () => {
  log.level = {
    0: 'info',
    1: 'verbose',
    2: 'silly',
  }[getOptions().verbose];

  if (getOptions().silent) {
    log.level = 'error';
  } else {
    log.enableProgress();
  }
  log.verbose('Verbose logging enabled.');
  log.silly('Very verbose logging enabled.');
};
