const { requestFromPath } = require('./requestGenerator');
describe('resourceGenerator', function() {
  describe('Request', function() {
    it('should generate request', function() {
      const path = '/issues';
      const resourceCode = requestFromPath(path, {
        'get': {
          'parameters': [
            {
              'name': 'fields',
              'in': 'query',
              'schema': { 'type': 'string' }
            }
          ],
          'responses': {
            '200': {
              'content': {
                'application/json': {
                  'schema': {
                    'type': 'array',
                    'items': {
                      '$ref': '#/components/schemas/Issue'
                    }
                  }
                }
              }
            }
          }
        }
      });

      expect(resourceCode).toContain(
        `/**
 * @param {GetIssuesRequestOptions} options
 * @returns {YoRequest<GetIssuesRequestOptions,Array<Issue>>}
 */
export function createGetIssuesRequest(options) {
  return {method: 'get', path: '${path}', options: options};
}`);
    });
  });

  describe('requestOption', function() {
    it('should generate resource for query collection path', function() {
      const path = '/issues';
      const resourceCode = requestFromPath(path, {
        'get': {
          'parameters': [
            {
              'name': 'fields',
              'in': 'query',
              'schema': { 'type': 'string' }
            }
          ],
          'responses': {
            '200': {
              'content': {
                'application/json': {
                  'schema': {
                    'type': 'array',
                    'items': {
                      '$ref': '#/components/schemas/Issue'
                    }
                  }
                }
              }
            }
          }
        }
      });

      expect(resourceCode).toContain(
        `/**
 * @typedef {object} GetIssuesRequestOptions
 * @property {object} [query]
 * @property {string} [query.fields]
 */`);
    });

    it('should generate resource for get an item from collection path', function() {
      const path = '/issues/{id}';
      const resourceCode = requestFromPath(path, {
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
              'schema': {
                'type': 'string'
              }
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

      expect(resourceCode).toContain(
        `/**
 * @typedef {object} GetIssuesIssueRequestOptions
 * @property {object} [query]
 * @property {string} [query.fields]
 * @property {object} path
 * @property {string} path.id
 */`);
    });

    it('should generate resource for delete subresource item from collection path based on previous method response content', function() {
      const path = '/issue/{id}';
      const resourceCode = requestFromPath(path, {
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
              'schema': {
                'type': 'string'
              }
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
        },
        'delete': {
          'parameters': [
            {
              'name': 'id',
              'in': 'path',
              'required': true,
              'schema': {
                'type': 'string'
              }
            }
          ],
          'responses': {
            '200': {
              'description': 'OK'
            }
          }
        }
      });

      expect(resourceCode).toContain(
        `/**
 * @typedef {object} DeleteIssueIssueRequestOptions
 * @property {object} path
 * @property {string} path.id
 */`);
    });

    it('should generate resource for delete an item from collection path if not response content and methods before', function() {
      const path = '/issues/{id}';
      const resourceCode = requestFromPath(path, {
        'delete': {
          'parameters': [
            {
              'name': 'id',
              'in': 'path',
              'required': true,
              'schema': {
                'type': 'string'
              }
            }
          ],
          'responses': {
            '200': {
              'description': 'OK'
            }
          }
        }
      });

      expect(resourceCode).toContain(
        `/**
 * @typedef {object} DeleteIssuesIssueRequestOptions
 * @property {object} path
 * @property {string} path.id
 */`);
    });

    it('should generate resource for delete subresource item from collection path if not content presented and not any method with content before', function() {
      const path = '/issues/{id}/attachments/{attachmentId}';
      const resourceCode = requestFromPath(path, {
        'delete': {
          'parameters': [
            {
              'name': 'id',
              'in': 'path',
              'required': true,
              'schema': {
                'type': 'string'
              }
            },
            {
              'name': 'attachmentId',
              'in': 'path',
              'required': true,
              'schema': {
                'type': 'string'
              }
            }
          ],
          'responses': {
            '200': {
              'description': 'OK'
            }
          }
        }
      });

      expect(resourceCode).toContain(
        `/**
 * @typedef {object} DeleteIssuesAttachmentsAttachmentRequestOptions
 * @property {object} path
 * @property {string} path.id
 * @property {string} path.attachmentId
 */`);
    });
  });
});