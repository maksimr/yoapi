const { typeInference } = require('./jsdoc');
const { jsdocForComponent } = require('./jsdoc');

const templateExpr = '{[^{]+}';
const templateExprRegExpAll = new RegExp(templateExpr + '\\/?', 'g');

function resourceFromPath(path, resourceDescription) {
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
    const reqDoc = generateCreateRequestFunctionForMethod(requestOptionsTypeName, responseType);
    return [reqOptionsDoc, reqDoc].join('\n\n');
  }

  function generateCreateRequestFunctionForMethod(requestOptionsType, responseType) {
    return [
      '/**',
      ` * @param {${requestOptionsType}} options`,
      ` * @returns {Request<${requestOptionsType},${responseType || 'object'}>}`,
      ' */',
      `export function create${requestOptionsType.replace(/Options$/, '')}(options) {`,
      `  return new Request('${path}', options);`,
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
 * @template R
 */
export class Request {
  /**
   * @param {string} path
   * @param {T} options
   */
  constructor(path, options) {
    this.path = path;
    this.options = options;
  }
}`;
}

module.exports.resourceFromPath = resourceFromPath;
module.exports.generateRequestGenericFunction = generateRequestGenericFunction;
