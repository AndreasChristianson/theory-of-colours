import log from 'npmlog';
import { getOptions } from '../options/arguments.js';
import { weightedPick } from '../random/index.js';
import planObjects from './index.js';

const findPlanEntry = () =>
  planObjects.filter(
    (planObject) =>
      planObject.name.toLowerCase() === getOptions().plan.toLowerCase()
  )[0];

export const lookupPlan = () => {
  const tracker = log.newItem('choosing plan');
  tracker.silly('Choosing plan for', getOptions().plan);

  const planObjectFromInput = getOptions().plan ? findPlanEntry() : undefined;
  const randomIndex = weightedPick(planObjects.map((plan) => plan.weight));
  const randomPlanObject = planObjects[randomIndex];
  const ChosenPlan = planObjectFromInput
    ? planObjectFromInput.class
    : randomPlanObject.class;

  tracker.info('Plan', ChosenPlan.name);

  return ChosenPlan;
};
