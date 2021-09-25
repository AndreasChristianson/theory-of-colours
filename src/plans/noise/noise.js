import log from 'npmlog';
import {
  getUniformGenerator,
  pickColor,
  pickDistribution,
} from '../../random/index.js';
import { getOptions } from '../../options/arguments.js';
import { buildSvg, writeElement } from '../plan-utils.js';

export default class {
  //subclasses to make
  // globular clusters
  // translucent blobs

  getPlanOptions() {
    return {
      foregroundColor: {
        type: 'palette',
      },
      backgroundColor: {
        type: 'near',
        color: 'black',
        jitter: 3,
      },
      count: 2000,
      radius: {
        type: 'normal',
        min: 1,
        max: 100,
        center: 40,
        stddev: 25,
      },
      opacity: {
        type: 'uniform',
        min: 0.5,
        max: 0.8,
      },
      ...getOptions(),
    };
  }

  generateNoise = async () => {
    const options = this.getPlanOptions();
    const tracker = log.newItem('noise', options.count);

    const sizeDistribution = pickDistribution(options.radius);
    const opacityDistribution = pickDistribution(options.opacity);
    const verticalDistribution = getUniformGenerator(options.height);
    const horizontalDistribution = getUniformGenerator(options.width);
    const foregroundColorGenerator = pickColor(options.foregroundColor);
    await writeElement({
      tag: 'rect',
      attributes: {
        fill: pickColor(options.backgroundColor)(),
        width: '100%',
        height: '100%',
      },
    });

    const elementCache = [];
    for (let id = 0; id < options.count; id++) {
      elementCache.push({
        tag: 'circle',
        attributes: {
          r: sizeDistribution(),
          cx: verticalDistribution(),
          cy: horizontalDistribution(),
          fill: foregroundColorGenerator(),
          opacity: opacityDistribution(),
          id,
        },
      });
      tracker.completeWork(1);
    }
    for (const element of elementCache) {
      await writeElement(element);
    }

    tracker.finish();
  }

  async buildSvg() {
  log.silly('plan options', options);

    await buildSvg(this.generateNoise);
  }
}
