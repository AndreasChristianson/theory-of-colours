import resolveReferences from 'self-referenced-object';
export default class {
  constructor(options) {
    this.defaultOptions = options;
  }

  addPlanOptions = (options) =>
    resolveReferences({
      center: {
        x: '${this.height / 2}',
        y: '${this.width / 2}',
      },
      ...this.defaultOptions,
      ...options,
    });

  async buildSvg(options) {
    throw new Error('nyi');
  }
}
