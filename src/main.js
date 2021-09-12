import './setup-cli-app.js';
import options from './options/arguments.js';
import log from 'npmlog';
import validateOptions from './options/validate.js';
import openOutputFile from './files/open-file.js';
import closeOutputFile from './files/close-file.js';
import lookupPlan from './plans/lookup-plan.js';
import open from 'open';

export default async () => {
  log.verbose('Verbose logging enabled.');
  log.silly('Very verbose logging enabled.');
  try {
    validateOptions();
    const writeStream = await openOutputFile(options.file);
    const Plan = await lookupPlan(options.plan);
    const planInstance = new Plan(options, writeStream);
    log.silly('Plan instance created');
    await planInstance.buildSvg();
    log.verbose('SVG generation complete.');
    await closeOutputFile(writeStream);
    log.verbose('SVG written to disk.');
    if (options.open) {
      log.silly('Opening output for viewing.');
      await open(options.file, {
        app: {
          name: open.apps.chrome,
        },
      });
    }
  } catch (e) {
    log.error('Error caught', e);
  }
  log.silly('Exiting.');
};
