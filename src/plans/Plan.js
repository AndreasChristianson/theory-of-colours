import log from 'npmlog';
import { getWriteStream } from '../files/index.js';

export default class {
  async writeToStream(string) {
    return new Promise((resolve) => {
      log.silly('Writing element to file', string);
      if (getWriteStream().write(string)) {
        resolve();
        return;
      }
      log.silly('fs buffer full. Pausing for drain event.');
      getWriteStream().once('drain', resolve);
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
