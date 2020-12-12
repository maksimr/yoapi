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
 * @param {boolean} [fields] Construct type for component fields
 * @returns {string}
 */
function jsdocForComponent(componentName, component, fields = false) {
  const comment = new Comment();
  const superType = typeInference(component, fields);
  const componentType = fields ? fieldsType(componentName) : componentName;
  comment.add(`@typedef {${superType}} ${componentType}`);
  Object.keys(component.properties || {}).forEach((propertyName) => {
    const property = component.properties[propertyName];
    const type = typeInference(property, fields);
    comment.add(`@property {${type}} ${property.optional ? '[' + propertyName + ']' : propertyName}`);
  });
  return comment.end();
}

/**
 * @param {Object} it
 * @param {boolean} [isFields]
 * @returns {string}
 */
function typeInference(it, isFields) {
  switch (true) {
    case (Boolean(it.oneOf || it.anyOf || it.allOf)):
      const types = it.oneOf || it.anyOf || it.allOf;
      return `(${types.map((i) => typeInference(i, isFields)).join('|')})`;
    case Boolean(it.$ref):
      const type = it.$ref.split('/').pop();
      return isFields ? fieldsType(type) : type;
    case (it.type === 'array'):
      const itemsType = typeInference(it.items, isFields);
      return isFields ? itemsType : `Array<${itemsType}>`;
    case (it.type === 'object'):
      return 'object';
    case (isFields):
      return '*';
    case (it.type === 'integer'):
      return 'number';
    case Boolean(it.type):
      return it.type;
    default:
      return 'any';
  }
}

function fieldsType(type) {
  return type + 'QueryFields';
}

module.exports.Comment = Comment;
module.exports.fieldsType = fieldsType;
module.exports.jsdocForComponent = jsdocForComponent;
module.exports.typeInference = typeInference;
