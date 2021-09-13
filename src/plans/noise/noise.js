import Plan from '../Plan.js';
import log from 'npmlog';
import elements from 'svg-builder/elements/index.js';
import { pick } from '../../random/index.js';
import { getOptions } from '../../options/arguments.js';
import {
  getUniformIntGenerator,
  getUniformGenerator,
  getTruncatedGaussianGenerator,
} from '../../random/index.js';
const STD_DEV_DIVIDER = 2;

export default class extends Plan {
  constructor() {
    super();
    this.group = log.newGroup('Noise Plan');
  }

  buildDistribution(type, center, min, max) {
    switch (type) {
      case 'normal':
      case 'gaussian':
        const stdDev = Math.min(max - center, center - min) / STD_DEV_DIVIDER;
        return getTruncatedGaussianGenerator(center, stdDev, min, max);

      case 'uniform':
        return getUniformGenerator(min, max);
    }
  }

  getPlanDefaults() {
    return {
      background: 'black',
      count: getUniformIntGenerator(5000, 10000)(),
      averageRadius: getUniformGenerator(0.5, 1.2)(),
      horizontalDistribution: pick(['uniform', 'normal']),
      verticalDistribution: pick(['uniform', 'normal']),
      // pallet
    };
  }

  async buildSvg() {
    const planOptions = {
      ...this.getPlanDefaults(),
      ...getOptions(),
    };
    const tracker = this.group.newItem('buildSvg', planOptions.count);
    tracker.verbose('derived plan options', planOptions);
    await this.writeToStream(
      `<svg version="1.1"
          width="${planOptions.width}"
          height="${planOptions.height}"
          xmlns="http://www.w3.org/2000/svg">`
    );

    await this.addElement(
      new elements.Rect({
        fill: planOptions.background,
        width: '100%',
        height: '100%',
      })
    );

    const sizeDistribution = getTruncatedGaussianGenerator(
      planOptions.averageRadius,
      planOptions.averageRadius / STD_DEV_DIVIDER,
      0
    );

    const horizontalDistribution = this.buildDistribution(
      planOptions.horizontalDistribution,
      planOptions.width / 2,
      0,
      planOptions.width
    );
    const verticalDistribution = this.buildDistribution(
      planOptions.verticalDistribution,
      planOptions.height / 2,
      0,
      planOptions.height
    );

    for (let count = 0; count < planOptions.count; count++) {
      await this.addElement(
        new elements.Circle({
          fill: 'white',
          r: Math.abs(sizeDistribution()),
          cx: horizontalDistribution(),
          cy: verticalDistribution(),
        })
      );
      tracker.completeWork(1);
    }

    await this.writeToStream('</svg>');
    tracker.finish();
  }
}
