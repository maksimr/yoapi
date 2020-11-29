const { resourceFromPath } = require('./resourceGenerator');
describe('resourceGenerator', function() {
  it('should generate resource for path', function() {
    const path = '/issues/{id}';
    const resourceCode = resourceFromPath(path, {
      'description': 'Resource that provides access to issues.',
      'get': {
        'parameters': [
          {
            'name': 'fields',
            'in': 'query',
            'schema': { 'type': 'string' }
          },
          {
            'name': 'id',
            'in': 'path',
            'required': true,
            'schema': { 'type': 'string' }
          }
        ],
        'responses': {
          '200': {
            'content': {
              'application/json': {
                'schema': {
                  '$ref': '#/components/schemas/Issue'
                }
              }
            }
          }
        }
      }
    });

    expect(resourceCode).toEqual(
      `/**
 * @typedef {object} IssuesRequestOptions
 * @property {object} [query]
 * @property {string} [query.fields]
 * @property {object} path
 * @property {string} path.id
 */`);
  });
});