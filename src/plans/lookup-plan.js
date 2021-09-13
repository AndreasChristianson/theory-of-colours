import log from 'npmlog';
import { getOptions } from '../options/arguments.js';
import plans from './index.js';

export const lookupPlan = () => {
  const tracker = log.newItem('choosing plan');
  tracker.silly('Choosing plan for', getOptions().plan);

  const ChosenPlan = plans[getOptions().plan];
  if (!ChosenPlan) {
    throw new Error(`Plan not found for ${getOptions().plan}.`);
  }

  tracker.silly('Found a non-null plan');

  return ChosenPlan;
};
