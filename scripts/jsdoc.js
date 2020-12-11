class Comment {
  constructor() {
    this.lines = ['/**'];
  }

  /**
   * @param {string} text
   * @returns {Comment}
   */
  add(text) {
    this.lines.push(` * ${text}`);
    return this;
  }

  /**
   * @returns {string}
   */
  end() {
    this.lines.push(' */');
    return this.lines.join('\n');
  }
}

/**
 * @param {string} componentName
 * @param {object} component
 * @returns {string}
 */
function jsdocForComponent(componentName, component) {
  const comment = new Comment();
  comment.add(`@typedef {${typeInference(component)}} ${componentName}`);
  Object.keys(component.properties || {}).forEach((propertyName) => {
    const property = component.properties[propertyName];
    const type = typeInference(property);
    comment.add(`@property {${type}} ${property.optional ? '[' + propertyName + ']' : propertyName}`);
  });
  return comment.end();
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

module.exports.Comment = Comment;
module.exports.jsdocForComponent = jsdocForComponent;
module.exports.typeInference = typeInference;
