import log from 'npmlog';
import { getOptions } from '../options/arguments.js';
import { weightedPick } from '../random/index.js';
import planObjects from './index.js';
const extractPlanName = (object) => object.name.toLowerCase();

const findPlanEntry = () =>
  planObjects.filter(
    (planObject) => extractPlanName(planObject) === extractPlanName(getOptions)
  )[0];

export const lookupPlan = () => {
  const tracker = log.newItem('choosing plan');
  tracker.silly('Choosing plan for', getOptions().plan);

  const planObjectFromInput = findPlanEntry();
  const randomIndex = weightedPick(planObjects.map((plan) => plan.weight));
  const randomPlanObject = planObjects[randomIndex];
  const ChosenPlan = planObjectFromInput
    ? planObjectFromInput.class
    : randomPlanObject.class;

  tracker.info('Plan', ChosenPlan.name);

  return ChosenPlan;
};
