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
 * @param {boolean} [shape] Construct type for component shape
 * @returns {string}
 */
function jsdocForComponent(componentName, component, shape = false) {
  const comment = new Comment();
  const superType = typeInference(component, shape);
  const componentType = shape ? shapeType(componentName) : componentName;
  comment.add(`@typedef {${superType}} ${componentType}`);
  Object.keys(component.properties || {}).forEach((propertyName) => {
    const property = component.properties[propertyName];
    const type = typeInference(property, shape);
    comment.add(`@property {${type}} ${property.optional ? '[' + propertyName + ']' : propertyName}`);
  });
  return comment.end();
}

/**
 * @param {Object} it
 * @param {boolean} [isShape]
 * @returns {string}
 */
function typeInference(it, isShape) {
  switch (true) {
    case (Boolean(it.oneOf || it.anyOf || it.allOf)):
      const types = it.oneOf || it.anyOf || it.allOf;
      return `(${types.map((i) => typeInference(i, isShape)).join('|')})`;
    case Boolean(it.$ref):
      const type = it.$ref.split('/').pop();
      return isShape ? shapeType(type) : type;
    case (it.type === 'array'):
      const itemsType = typeInference(it.items, isShape);
      return isShape ? itemsType : `Array<${itemsType}>`;
    case (it.type === 'object'):
      return 'object';
    case (isShape):
      return '*';
    case (it.type === 'integer'):
      return 'number';
    case Boolean(it.type):
      return it.type;
    default:
      return 'any';
  }
}

function shapeType(type) {
  return type + 'Shape';
}

module.exports.Comment = Comment;
module.exports.shapeType = shapeType;
module.exports.jsdocForComponent = jsdocForComponent;
module.exports.typeInference = typeInference;
