import log from 'npmlog';
import plans from './index.js';

export default (planName) => {
  const tracker = log.newItem('choosing plan');
  tracker.silly('Choosing plan for', planName);

  const ChosenPlan = plans[planName];
  if (!ChosenPlan) {
    throw new Error(`Plan not found for ${planName}.`);
  }

  tracker.silly('Found a non-null plan');

  return ChosenPlan;
};
