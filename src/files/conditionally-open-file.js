import log from 'npmlog';
import open from 'open';
import { getOptions } from '../options/arguments.js';

export const conditionallyOpenOutputFile = async () => {
  if (getOptions().open) {
    log.silly('Opening output for viewing.');
    await open(getOptions().file, {
      app: {
        name: open.apps.chrome,
      },
    });
  }
};
