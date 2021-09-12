export default class {
  async writeToStream(writeStream, string) {
    return new Promise((resolve) => {
      if (writeStream.write(string)) {
        resolve();
      }
      writeStream.on('drain', resolve);
    });
  }
}
