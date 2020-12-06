const { typeInference } = require('./jsdoc');
const { jsdocForComponent } = require('./jsdoc');

const templateExpr = '{[^{]+}';
const templateExprRegExpAll = new RegExp(templateExpr + '\\/?', 'g');
const REQUEST_TYPE = 'YoRequest';

function requestFromPath(path, resourceDescription, serverUrl = '') {
  const parts = path
    .replace(/^\//, '')
    .replace(templateExprRegExpAll, '')
    .replace(/\/$/, '')
    .split('/');
  const name = parts.map(capitalize).join('');
  let maybeCollectionName = capitalize(parts[parts.length - 1] || '');
  maybeCollectionName = maybeCollectionName.slice(0, maybeCollectionName.length - 1);
  const isEntityFromCollection = new RegExp(templateExpr + '$').test(path);

  return ['get', 'post', 'delete', 'put']
    .filter((method) => resourceDescription[method])
    .map((method) => generateRequestOptionsForMethod(method)).join('\n\n');

  function generateRequestOptionsForMethod(method) {
    const responseType = getResponseType(resourceDescription[method]);
    const suffix = isEntityFromCollection ? generateSuffixForMethod(responseType) : '';
    const requestOptionsTypeName = `${capitalize(method)}${name}${suffix}RequestOptions`;

    const properties = resourceDescription[method].parameters.reduce((properties, parameter) => {
      const groupName = parameter.in;
      properties[groupName] = properties[groupName] || { type: 'object', required: parameter.required };
      properties[`${groupName}.${parameter.name}`] = Object.assign({ 'required': parameter.required }, parameter.schema);
      return properties;
    }, {});

    const reqOptionsDoc = jsdocForComponent(requestOptionsTypeName, {
      type: 'object',
      properties: properties
    });
    const reqDoc = generateCreateRequestFunctionForMethod(method, requestOptionsTypeName, responseType, properties);
    return [reqOptionsDoc, reqDoc].join('\n\n');
  }

  function generateCreateRequestFunctionForMethod(method, requestOptionsType, responseType, properties) {
    const reqPath = serverUrl ?
      serverUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, '') :
      path;
    return [
      '/**',
      ` * @param {${requestOptionsType}} options`,
      ` * @returns {${REQUEST_TYPE}<${responseType || 'object'}>}`,
      ' */',
      `export function create${requestOptionsType.replace(/Options$/, '')}(options) {`,
      `  return {method: '${method}', path: ${properties.path ? `interpolate('${reqPath}', options.path)` : `'${reqPath}'`}, query: ${properties.query ? 'options.query' : 'null'}};`,
      '}'
    ].join('\n');
  }

  function generateSuffixForMethod(responseType) {
    const suffix = responseType;
    if (!suffix) {
      return maybeCollectionName;
    }
    maybeCollectionName = suffix;
    return suffix;
  }
}

function getResponseType(reqDescription) {
  const schema = (
    reqDescription.responses &&
    reqDescription.responses['200'] &&
    reqDescription.responses['200'].content &&
    reqDescription.responses['200'].content['application/json'] &&
    reqDescription.responses['200'].content['application/json'].schema &&
    reqDescription.responses['200'].content['application/json'].schema
  );
  return schema ? typeInference(schema) : '';
}

function capitalize(it) {
  return it[0].toUpperCase() + it.slice(1);
}

function generateRequestGenericFunction() {
  return `/**
 * @template T
 * @typedef ${REQUEST_TYPE}
 * @property {string} method
 * @property {string} path
 * @property {any} [query]
 */`;
}

module.exports.REQUEST_TYPE = REQUEST_TYPE;
module.exports.requestFromPath = requestFromPath;
module.exports.generateRequestGenericFunction = generateRequestGenericFunction;
