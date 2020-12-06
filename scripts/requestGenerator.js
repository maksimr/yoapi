const { typeInference } = require('./jsdoc');
const { jsdocForComponent, Comment } = require('./jsdoc');

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

    const parameters = resourceDescription[method].parameters;
    const properties = parameters.length ? parameters.reduce((properties, parameter) => {
      const groupName = parameter.in;
      properties[groupName] = properties[groupName] || { type: 'object', required: parameter.required };
      properties[`${groupName}.${parameter.name}`] = Object.assign({ 'required': parameter.required }, parameter.schema);
      return properties;
    }, {}) : null;

    const reqOptionsDoc = properties ? jsdocForComponent(requestOptionsTypeName, {
      type: 'object',
      properties: properties
    }) : '';
    const reqDoc = generateCreateRequestFunctionForMethod(method, requestOptionsTypeName, responseType, properties);
    return [reqOptionsDoc, reqDoc].filter((it) => it).join('\n\n');
  }

  function generateCreateRequestFunctionForMethod(method, requestOptionsType, responseType, properties) {
    const comment = new Comment();
    const reqPath = serverUrl ? serverUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, '') : path;
    properties && comment.add(`@param {${requestOptionsType}} options`);
    comment.add(`@returns {${REQUEST_TYPE}<${responseType || 'object'}>}`);
    return [
      comment.end(),
      `export function create${requestOptionsType.replace(/Options$/, '')}(${properties ? 'options' : ''}) {`,
      `  return {method: '${method}', path: ${properties && properties.path ? `interpolate('${reqPath}', options.path)` : `'${reqPath}'`}, query: ${properties && properties.query ? 'options && options.query' : 'null'}};`,
      '}'
    ].filter((it) => it).join('\n');
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
  const comment = new Comment();
  return comment
    .add('@template T')
    .add(`@typedef ${REQUEST_TYPE}`)
    .add('@property {string} method')
    .add('@property {string} path')
    .add('@property {any} [query]')
    .end();
}

module.exports.REQUEST_TYPE = REQUEST_TYPE;
module.exports.requestFromPath = requestFromPath;
module.exports.generateRequestGenericFunction = generateRequestGenericFunction;
