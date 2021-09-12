import log from 'npmlog';

export default class {
  constructor(writeStream) {
    this.writeStream = writeStream;
  }
  async writeToStream(string) {
    return new Promise((resolve) => {
      log.silly('Writing element to file', string);
      if (this.writeStream.write(string)) {
        resolve();
      }
      log.silly('fs buffer full. Pausing for drain event.');
      this.writeStream.once('drain', resolve);
    });
  }

  async addElement(element) {
    if (!element.content) {
      element.node += this.closeTag(element.name);
      await this.writeToStream(element.node);
    } else if (typeof element.content === 'string' && element.name === 'text') {
      element.node += element.content + this.closeTag(element.name);
      await this.writeToStream(element.node);
    } else {
      throw new Error("Don't know how to add element");
    }
  }

  closeTag(name) {
    return '</' + name + '>';
  }
}
