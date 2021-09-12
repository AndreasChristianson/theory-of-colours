import log from 'npmlog';
import options from './options/arguments.js';

process.on('unhandledRejection', (err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(-1);
});

log.level = {
  0: 'info',
  1: 'verbose',
  2: 'silly',
}[options.verbose];

log.enableProgress();

if (options.silent) {
  log.level = 'error';
  log.disableProgress();
}
