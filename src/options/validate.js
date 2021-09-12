import options from './arguments.js';
import log from 'npmlog';

export default () => {
  log.silly('parsed options', options);

  log.info('Seed', options.seed);
};
