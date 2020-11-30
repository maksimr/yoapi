import { interpolate } from './path';

describe('path', function() {
  it('should replace placeholders in path', function() {
    expect(interpolate('/foo/{id}', {
      id: 'x'
    })).toEqual('/foo/x');
  });

  it('should not touch placeholder if it is not presented in passed parameters', function() {
    expect(interpolate('/foo/{id}', {}))
      .toEqual('/foo/{id}');
  });

  it('should not touch placeholder params null', function() {
    expect(interpolate('/foo/{id}', null))
      .toEqual('/foo/{id}');
  });
});