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
  const maybeCollectionName = capitalize(parts[parts.length - 1] || '');
  const isEntityFromCollection = new RegExp(templateExpr + '$').test(path);

  return ['get', 'post', 'delete', 'put']
    .filter((method) => resourceDescription[method])
    .map(generateRequestOptionsForMethod).join('\n\n');

  function generateRequestOptionsForMethod(method) {
    const suffix = isEntityFromCollection ? generateSuffixForMethod(resourceDescription[method]) : '';
    const requestOptionsTypeName = `${capitalize(method)}${name}${suffix}RequestOptions`;
    const properties = resourceDescription[method].parameters.reduce((properties, parameter) => {
      const groupName = parameter.in;
      properties[groupName] = properties[groupName] || { type: 'object', required: parameter.required };
      properties[`${groupName}.${parameter.name}`] = Object.assign({ 'required': parameter.required }, parameter.schema);
      return properties;
    }, {});
    return jsdocForComponent(requestOptionsTypeName, {
      type: 'object',
      properties: properties
    });
  }

  function generateSuffixForMethod(reqDescription) {
    const suffix = getResponseType(reqDescription);
    if (!suffix) {
      return maybeCollectionName.slice(0, maybeCollectionName.length - 1);
    }
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

module.exports.resourceFromPath = resourceFromPath;