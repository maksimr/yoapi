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
      const optional = !parameter.required;
      properties[groupName] = properties[groupName] || { type: 'object', optional: optional };
      const parameterName = parameter.name;
      if (responseType && groupName === 'query' && parameterName === 'fields') {
        const fieldsType = getResponseType(resourceDescription[method], true);
        parameter.schema = { type: `Partial<${fieldsType}>` };
      }
      properties[`${groupName}.${parameterName}`] = Object.assign({ optional: optional }, parameter.schema);
      return properties;
    }, {}) : null;

    const reqOptionsDoc = properties ? jsdocForComponent(requestOptionsTypeName, {
      type: 'object',
      properties: properties
    }) : '';
    const reqDoc = generateCreateRequestFunctionForMethod(method, requestOptionsTypeName, responseType, properties, parameters);
    return [reqOptionsDoc, reqDoc].filter((it) => it).join('\n\n');
  }

  function generateCreateRequestFunctionForMethod(method, requestOptionsType, responseType, properties, parameters) {
    const comment = new Comment();
    const reqPath = serverUrl ? serverUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, '') : path;
    properties && comment.add(`@param {${requestOptionsType}} options`);
    comment.add(`@returns {${REQUEST_TYPE}<${responseType || 'object'}>}`);
    return [
      comment.end(),
      `export function create${requestOptionsType.replace(/Options$/, '')}(${properties ? 'options' : ''}) {`,
      `  return {method: '${method}', path: ${properties && properties.path ? `\`${compilePath(reqPath, parameters)}\`` : `'${reqPath}'`}, query: ${properties && properties.query ? 'options && options.query' : 'null'}};`,
      '}'
    ].filter((it) => it).join('\n');

    function compilePath(path, parameters) {
      const pathParams = parameters.filter(it => it.in === 'path').reduce((dict, param) => {
        dict[param.name] = `\${options.path.${param.name}}`;
        return dict;
      }, {});

      return path.replace(/{([^{}]+)}/g,
        (_, paramName) => pathParams.hasOwnProperty(paramName) ? pathParams[paramName] : _
      );
    }
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

function getResponseType(reqDescription, shape) {
  const schema = (
    reqDescription.responses &&
    reqDescription.responses['200'] &&
    reqDescription.responses['200'].content &&
    reqDescription.responses['200'].content['application/json'] &&
    reqDescription.responses['200'].content['application/json'].schema &&
    reqDescription.responses['200'].content['application/json'].schema
  );
  return schema ? typeInference(schema, shape) : '';
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
