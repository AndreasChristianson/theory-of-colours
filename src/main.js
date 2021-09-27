import { setupLogging } from './setup-cli-app.js';
import { setOptions, getOptions } from './options/arguments.js';
import log from 'npmlog';
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

    setupSeed();
    log.info('Seed', getOptions().seed);
    log.verbose('parsed options', getOptions());

    await openFile();

    const Plan = await lookupPlan();

    const planInstance = new Plan();
    log.silly('Plan instance created');

    const options = planInstance.addPlanOptions(getOptions());
    log.silly('Plan instance created', options);

    await planInstance.buildSvg(options);
    log.verbose('SVG generation complete.');

    await closeFile();
    log.verbose('SVG written to disk.');

    await conditionallyOpenOutputFile();
  } catch (e) {
    log.error('Error caught', e);
  }
  log.silly('Exiting.');
};
