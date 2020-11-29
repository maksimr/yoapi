const { jsdocForComponent } = require('./jsdoc');

function resourceFromPath(path, pathDescription) {
  const name = path
    .replace(/^\//, '')
    .replace(/{.*}\/?/, '')
    .replace(/\/$/, '')
    .split('/')
    .map((it) => it[0].toUpperCase() + it.slice(1)).join('');

  const requestTypeName = `${name}Request`;
  const requestOptionsTypeName = `${requestTypeName}Options`;
  const properties = pathDescription.get.parameters.reduce((properties, parameter) => {
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

module.exports.resourceFromPath = resourceFromPath;