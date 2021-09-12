import Plan from '../Plan.js';

export default class extends Plan {
  constructor(options) {
    super();
  }
  async buildSvg(writeStream) {
    await this.writeToStream(
      writeStream,
      '<svg version="1.1" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">'
    );

    await this.writeToStream(
      writeStream,
      '<circle cx="500" cy="500" r="500" fill="green" />'
    );

    await this.writeToStream(writeStream, '</svg>');
  }
}
