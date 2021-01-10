const fetch = require('node-fetch')
const { Headers } = require('node-fetch')
const config = require('./config')

function fetchScalewayJson (url, options = {}) {
  const meta = {
    'X-Auth-Token': config.SECRET_KEY
  }
  const headers = new Headers(meta)
  if (options && options.method && options.method.toLowerCase() !== 'get') {
    headers.set('Content-Type', 'application/json')
  }
  return fetch(url, Object.assign(options, { headers }))
    .then(r => r.json())
    .catch(error => {
      console.log('Request JSON data failed', error)
    })
}

module.exports = { fetchScalewayJson }
