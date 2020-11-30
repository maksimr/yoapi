/**
 * @param {string} path
 * @param {object} [params]
 * @returns {string}
 */
export function interpolate(path, params) {
  return (params ?
    path.replace(/{([^{}]+)}/g,
      (_, paramName) => params.hasOwnProperty(paramName) ? params[paramName] : _
    ) :
    path);
}