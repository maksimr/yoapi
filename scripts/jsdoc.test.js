const { jsdocForComponent } = require('./jsdoc');
describe('jsdoc', function() {
  it('should generate jsdoc for component', function() {
    const componentName = 'Foo';
    const component = {
      'type': 'object',
      'properties': {
        '$type': {
          'type': 'string',
          'readOnly': true
        }
      }
    };

    const jsdoc = jsdocForComponent(componentName, component);
    expect(jsdoc).toEqual(
      `/**
 * @typedef {object} Foo
 * @property {string} [$type]
 */`
    );
  });

  it('should convert integer to number', function() {
    const componentName = 'Foo';
    const component = {
      'type': 'object',
      'properties': {
        'foo': {
          'type': 'integer'
        }
      }
    };

    const jsdoc = jsdocForComponent(componentName, component);
    expect(jsdoc).toEqual(
      `/**
 * @typedef {object} Foo
 * @property {number} [foo]
 */`
    );
  });

  it('should handle allOf type', function() {
    const componentName = 'Foo';
    const component = {
      'allOf': [{ 'type': 'object' }, { 'type': 'string' }]
    };

    const jsdoc = jsdocForComponent(componentName, component);
    expect(jsdoc).toEqual(
      `/**
 * @typedef {(object|string)} Foo
 */`
    );
  });

  it('should handle reference on type', function() {
    const componentName = 'Foo';
    const component = {
      '$ref': '#/components/schemas/Bar'
    };

    const jsdoc = jsdocForComponent(componentName, component);
    expect(jsdoc).toEqual(
      `/**
 * @typedef {Bar} Foo
 */`
    );
  });
});