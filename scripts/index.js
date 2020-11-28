const { promisify } = require('util');
const { resolve } = require('path');
const { downloadSchema } = require('./schema');
const { jsdocForComponent } = require('./jsdoc');

function main() {
  downloadSchema('https://youtrack.jetbrains.com').then((data) => {
    generateComponentsJsDoc(data);
  });

  function generateComponentsJsDoc(data) {
    const JSDOC_FILE_PATH = resolve(__dirname, '../lib/api.js');
    const doc = Object.keys(data.components.schemas).map((componentName) => {
      const component = data.components.schemas[componentName];
      return jsdocForComponent(componentName, component);
    }).join('\n\n');
    promisify(require('fs').writeFile)(JSDOC_FILE_PATH, doc);
  }
}

main();