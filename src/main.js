import { setupLogging } from './setup-cli-app.js';
import { setOptions } from './options/arguments.js';
import log from 'npmlog';
import { validateOptions } from './options/validate.js';
import {
  openFile,
  closeFile,
  conditionallyOpenOutputFile,
} from './files/index.js';
import { lookupPlan } from './plans/lookup-plan.js';
import { setupSeed } from './random/index.js';

export const main = async () => {
  try {
    setOptions();
    setupLogging();

    validateOptions();
    setupSeed();

    await openFile();

    const Plan = await lookupPlan();

    const planInstance = new Plan();
    log.silly('Plan instance created');

    await planInstance.buildSvg();
    log.verbose('SVG generation complete.');

    await closeFile();
    log.verbose('SVG written to disk.');

    await conditionallyOpenOutputFile();
  } catch (e) {
    log.error('Error caught', e);
  }
  log.silly('Exiting.');
};
