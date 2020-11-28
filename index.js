const https = require('https');
const {promisify} = require('util');

/**
 * @param {string} [host]
 */
function generate(host = 'https://youtrack.jetbrains.com') {
  const JSDOC_FILE_PATH = './lib/api.js';
  downloadSchema(host).then((data) => {
    const doc = Object.keys(data.components.schemas).map((componentName) => {
      const component = data.components.schemas[componentName];
      return generateComponentDoc(componentName, component);
    }).join('\n');
    promisify(require('fs').writeFile)(JSDOC_FILE_PATH, doc);
  });
}

function generateComponentDoc(componentName, component) {
  const builder = [];

  builder.push('/**');
  builder.push(commentPart(`@typedef {${typeInference(component)}} ${componentName}`));
  Object.keys(component.properties || {}).forEach((propertyName) => {
    const property = component.properties[propertyName];
    const type = typeInference(property);
    builder.push(commentPart(`@property {${type}} [${propertyName}]`));
  });
  builder.push('*/');

  return builder.join('\n');

  function commentPart(it) {
    return ` * ${it}`;
  }

  function typeInference(it) {
    switch (true) {
      case (Boolean(it.oneOf || it.anyOf || it.allOf)):
        const types = it.oneOf || it.anyOf || it.allOf;
        return `(${types.map(typeInference).join('|')})`;
      case (it.type === 'integer'):
        return 'number';
      case (it.type === 'array'):
        return `Array<${typeInference(it.items)}>`;
      case Boolean(it.type):
        return it.type;
      case Boolean(it.$ref):
        return it.$ref.split('/').pop();
      default:
        return 'any';
    }
  }
}

/**
 * @param {string} [host]
 * @returns {Promise}
 */
function downloadSchema(host) {
  const fs = require('fs');
  const jsonPath = './.cache/openapi.json';

  if (fs.existsSync(jsonPath)) {
    return promisify(fs.readFile)(jsonPath)
      .then((data) => JSON.parse(data.toString()));
  }

  return promisify(fetchJsonSchema)(host).then((data) => {
    const dirs = jsonPath.split('/');
    dirs.pop();
    dirs.reduce((parentDir, dirName) => {
      const dir = require('path').join(parentDir, dirName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      return dir;
    }, '.');
    fs.writeFileSync(jsonPath, JSON.stringify(data));
    return data;
  });
}

/**
 * @param {string} host
 * @param {function(*, *): void} cb
 */
function fetchJsonSchema(host, cb) {
  const openapiUrl = `${host}/api/openapi.json`;
  const req = https.request(openapiUrl, (response) => {
    let data = '';
    response.on('data', (chunk) => data += chunk);
    response.on('end', () => cb(null, JSON.parse(data)));
    response.on('error', (error) => cb(error));
  });
  req.end();
}


function main() {
  generate();
}

main();