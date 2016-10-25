# spotify-local-control [![stability][0]][1]
[![npm version][2]][3] [![downloads][4]][5] [![js-standard-style][6]][7]

## Usage
```js
const connect = require('spotify-local-control')
const client = connect()

client.play('spotify:track:0JhKJg5ejeQ8jq89UQtnw8')
client.pause()
client.resume()
client.status().then(res => console.log(res))
```

## API
### client = connect()
Initialize a new client.

### client.play(spotifyUri, spotifyContext?)
Plays the given song by [spotifyUri].
[spotifyContext] can be specified to display a
related song, playlist, album or artist.

### client.pause()
Pauses the playback.

### client.resume()
Resumes the playback.

### client.status(returnOn?, returnAfter?)
Get status information about the local client.

## Installation
```sh
$ npm install spotify-local-control
```

## See Also
- [spotify-find](https://github.com/f-mer/spotify-local-control) - get spotify catalog information

## License
[MIT](https://tldrlegal.com/license/mit-license)

[spotifyUri]: https://developer.spotify.com/web-api/user-guide/#spotify-uris-and-ids
[spotifyContext]: https://developer.spotify.com/web-api/user-guide/#spotify-uris-and-ids

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/spotify-local-control.svg?style=flat-square
[3]: https://npmjs.org/package/spotify-local-control
[4]: http://img.shields.io/npm/dm/spotify-local-control.svg?style=flat-square
[5]: https://npmjs.org/package/spotify-local-control
[6]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[7]: https://github.com/feross/standard
