var https = require('https')
var querystring = require('querystring')
var urlParseLax = require('url-parse-lax')
var getStream = require('get-stream')
var randomString = require('random-string')
var portscanner = require('portscanner')

module.exports = connect

// create a new instance
// null -> obj
function connect () {
  var api = localApi()

  return {
    // return player status
    // (str?, str?) -> promise
    status (returnOn, returnAfter) {
      if (Array.isArray(returnOn)) {
        returnOn = returnOn.join(',')
      }

      return api.get('/remote/status.json', {
        returnon: returnOn,
        returnafter: returnAfter
      })
    },

    // start playing a track
    // (str, str?) -> promise
    play (uri, context) {
      return api.get('/remote/play.json', {uri, context})
    },

    // pause playback
    // null -> promise
    pause () {
      return api.get('/remote/pause.json', {pause: true})
    },

    // resume playback
    // null -> promise
    resume () {
      return api.get('/remote/pause.json', {pause: false})
    }
  }
}

// communicate with the local spotify client
// null -> obj
function localApi () {
  var csrfAndOuathAndEndpoints

  return {
    // send request to local spotify client
    // (str, obj?) -> promise
    get (path, query = {}) {
      csrfAndOuathAndEndpoints = csrfAndOuathAndEndpoints || Promise.all([
        getOauthToken(),
        findPort()
      ])
        .then(function ([oauth, port]) {
          var endpoint = `https://${randomString({length: 10})}.spotilocal.com:${port}`

          return Promise.all([
            oauth,
            getCsrfToken({endpoint: endpoint}),
            endpoint
          ])
        })

      return csrfAndOuathAndEndpoints.then(([oauth, csrf, endpoint]) => get(endpoint + path, {
        headers: {
          'Origin': 'https://open.spotify.com'
        },
        query: Object.assign({csrf, oauth}, query)
      }))
    }
  }

  // find port sportify webhelper is running on
  // null -> int
  function findPort () {
    return new Promise(function (resolve, reject) {
      portscanner.findAPortInUse(4370, 4380, '127.0.0.1', function (error, port) {
        error ? reject(error) : resolve(port)
      })
    })
  }

  // fetch csrf token
  // null -> promise
  function getCsrfToken ({endpoint}) {
    return get(endpoint + '/simplecsrf/token.json', {
      headers: {
        'Origin': 'https://open.spotify.com'
      }
    })
      .then((res) => res.body['token'])
  }

  // fetch oauth token
  // null -> promise
  function getOauthToken () {
    return get('https://open.spotify.com/token', {
      headers: {
        'User-Agent': 'spotify-local-control'
      }
    })
      .then((res) => res.body['t'])
  }
}

// send a get request
// (str, obj?) -> promise
function get (url, opts = {}) {
  return new Promise(function (resolve, reject) {
    url = urlParseLax(url)
    if (opts.query) {
      opts.query = querystring.stringify(opts.query)
      url.path = `${url.path}?${opts.query}`
      delete opts.query
    }
    opts = Object.assign({method: 'GET', rejectUnauthorized: false}, url, opts)

    https.request(opts, function (res) {
      getStream(res)
        .then(data => JSON.parse(data))
        .then(function (body) {
          res.body = body
          return res
        })
        .then(resolve)
    })
      .once('error', reject)
      .end()
  })
}
