/**
 * @param {string} componentName
 * @param {object} component
 * @returns {string}
 */
function jsdocForComponent(componentName, component) {
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
}

/**
 * @param {Object} it
 * @returns {string}
 */
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

module.exports.jsdocForComponent = jsdocForComponent;