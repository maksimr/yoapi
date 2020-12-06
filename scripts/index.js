const { generateRequestGenericFunction } = require('./requestGenerator');
const { requestFromPath } = require('./requestGenerator');
const { promisify } = require('util');
const { resolve } = require('path');
const { downloadSchema } = require('./schema');
const { jsdocForComponent } = require('./jsdoc');

function main() {
  const codegenComment =
    '// AUTOGENERATED FILE DO NOT EDIT!\n' +
    '// This file was generated by script\n' +
    '\n'
  ;

  downloadSchema('https://youtrack.jetbrains.com').then((data) => {
    generateComponentsJsDoc(data);
    generateResources(data);
  });

  function generateComponentsJsDoc(data) {
    return generateDoc(data.components.schemas, jsdocForComponent, '../lib/entities.js');
  }

  function generateResources(data) {
    const serverUrl = (data.servers && data.servers[0] && data.servers[0].url) || '';
    return generateDoc(data.paths, (...args) => requestFromPath(...args, serverUrl), '../lib/requests.js',
      [
        'import \'./entities\';',
        generateRequestGenericFunction(),
        require('fs').readFileSync(resolve(__dirname, './path.js')).toString(),
        ''
      ].join('\n\n')
    );
  }

  function generateDoc(entities, generator, path, prefix = '') {
    const docPath = resolve(__dirname, path);
    const doc = Object.keys(entities)
      .map((key) => generator(key, entities[key])).join('\n\n');
    return promisify(require('fs').writeFile)(docPath, codegenComment + prefix + doc);
  }
}

main();