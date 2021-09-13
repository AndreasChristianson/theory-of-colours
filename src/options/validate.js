import { getOptions } from './arguments.js';
import log from 'npmlog';

export const validateOptions = () => {
  log.verbose('parsed options', getOptions());

  log.info('Seed', getOptions().seed);
};
