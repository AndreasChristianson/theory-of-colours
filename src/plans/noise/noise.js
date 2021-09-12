import Plan from '../Plan.js';
import log from 'npmlog';
import svgBuilder from 'svg-builder';
import elements from 'svg-builder/elements/index.js';
import randomModule from 'random';
import pick from '../../utilities/pick.js';
const STD_DEV_DIVIDER = 4;

export default class extends Plan {
  constructor(options, writeStream) {
    super(writeStream);
    this.options = options;
    this.group = log.newGroup('Noise Plan');
    this.random = randomModule.clone(options.seed);
  }

  buildDistribution(type, center, min, max) {
    switch (type) {
      case 'normal':
      case 'gaussian':
        const stdDev = Math.min(max - center, center - min) / STD_DEV_DIVIDER;
        return this.random.normal(center, stdDev);

      case 'uniform':
        return this.random.uniform(min, max);
    }
  }

  getPlanDefaults() {
    return {
      background: 'black',
      count: this.random.int(5000, 10000),
      averageRadius: 1,
      horizontalDistribution: pick(['uniform', 'normal']),
      verticalDistribution: pick(['uniform', 'normal']),
      // pallet
    };
  }

  async buildSvg() {
    const planOptions = {
      ...this.getPlanDefaults(),
      ...this.options,
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

    const sizeDistribution = this.random.normal(
      planOptions.averageRadius,
      planOptions.averageRadius / STD_DEV_DIVIDER
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
