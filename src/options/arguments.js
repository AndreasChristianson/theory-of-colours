import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import pick from '../utilities/pick.js';
import random from 'random';
import plans from '../plans/index.js';

const availablePlans = Object.keys(plans);

const options = yargs(hideBin(process.argv))
  .epilogue(
    '🎨 https://github.com/AndreasChristianson/theory-of-colours#readme'
  )
  .example([
    ['$0 --open', 'Create a random svg and open it'],
    [
      '$0 --plan splatter -f splatter.svg -c options.json',
      'Create splatter.svg using the splatter plan with the given config',
    ],
    ['$0 -s 1234567890', 'Create the svg related to one seed'],
  ])
  .wrap(yargs.terminalWidth)
  .option('verbose', {
    alias: 'v',
    type: 'count',
    description: 'Run with verbose logging. try -vv for more verbose',
  })
  .option('seed', {
    alias: 's',
    type: 'number',
    description: 'Initial seed',
    defaultDescription: 'chosen randomly',
    default: () => random.int(0, Number.MAX_SAFE_INTEGER),
  })
  .option('plan', {
    alias: 'p',
    type: 'string',
    description: 'The overall plan to use',
    choices: availablePlans,
    defaultDescription: 'chosen randomly',
    default: () => pick(availablePlans),
  })
  .option('plan-config', {
    alias: 'c',
    type: 'config',
    description: 'Provide the give json file as options to the plan',
  })
  .option('open', {
    alias: 'o',
    type: 'boolean',
    description: 'Open the svg via `open`',
  })
  .option('output-file', {
    alias: ['file', 'f'],
    type: 'string',
    description: 'The file to write to',
    default: 'art.svg',
  })
  .option('width', {
    type: 'number',
    description: "The file's width.",
    default: 1000,
  })
  .option('height', {
    type: 'number',
    description: "The file's height.",
    default: 1000,
  })
  .option('silent', {
    type: 'boolean',
    description: 'Only display errors, no other logs.',
  }).argv;

export default options;
