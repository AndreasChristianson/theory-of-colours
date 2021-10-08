import log from 'npmlog';
import { pickRandomPalette } from '../../random/colors/palettes.js';
import { generateRandomColor } from '../../random/colors/pick-color.js';
import {
  getUniformGenerator,
  pickDistribution,
  pick,
  getUniformIntGenerator,
} from '../../random/index.js';
import { generateSvgBuilder } from '../plan-utils.js';
import Plan from '../Plan.js';

class Noise extends Plan {
  constructor(options) {
    super({
      foregroundColorPalette: pickRandomPalette(),
      backgroundColor: generateRandomColor().toString(),
      count: getUniformIntGenerator(100, 3000)(),
      radius: {
        type: 'normal',
        min: 1,
        max: 100,
        center: 40,
        stddev: 25,
      },
      opacity: {
        type: 'uniform',
        min: 0.3,
        max: 1,
      },
      ...options,
    });
  }
  //subclasses to make
  // globular clusters
  // translucent blobs

  generateNoise = (options) => {
    const tracker = log.newItem('noise', options.count);

    const sizeDistribution = pickDistribution(options.radius);
    const opacityDistribution = pickDistribution(options.opacity);
    const verticalDistribution = getUniformGenerator(0, options.height);
    const horizontalDistribution = getUniformGenerator(0, options.width);

    const elementCache = [];
    for (let id = 0; id < options.count; id++) {
      elementCache.push({
        tag: 'circle',
        attributes: {
          r: sizeDistribution(),
          cx: verticalDistribution(),
          cy: horizontalDistribution(),
          fill: pick(options.foregroundColorPalette),
          opacity: opacityDistribution(),
          id,
        },
      });
      tracker.completeWork(1);
    }

    tracker.finish();
    return elementCache;
  };

  buildSvg = generateSvgBuilder(this.generateNoise);
}

export default Noise;
