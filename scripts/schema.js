const https = require('https');
const { promisify } = require('util');
const { resolve } = require('path');

/**
 * @param {string} [host]
 * @returns {Promise}
 */
function downloadSchema(host) {
  const fs = require('fs');
  const jsonPath = resolve(__dirname, '../.cache/openapi.json');

  if (fs.existsSync(jsonPath)) {
    return promisify(fs.readFile)(jsonPath)
      .then((data) => JSON.parse(data.toString()));
  }

  return promisify(fetchJsonSchema)(host).then((data) => {
    const dirs = jsonPath.split('/');
    dirs.pop();
    dirs.reduce((parentDir, dirName) => {
      const dir = require('path').join(parentDir, dirName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      return dir;
    }, '.');
    fs.writeFileSync(jsonPath, JSON.stringify(data));
    return data;
  });
}

/**
 * @param {string} host
 * @param {function(*, *): void} cb
 */
function fetchJsonSchema(host, cb) {
  const openapiUrl = `${host}/api/openapi.json`;
  const req = https.request(openapiUrl, (response) => {
    let data = '';
    response.on('data', (chunk) => data += chunk);
    response.on('end', () => cb(null, JSON.parse(data)));
    response.on('error', (error) => cb(error));
  });
  req.end();
}

module.exports.downloadSchema = downloadSchema;