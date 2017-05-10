var connect = require('./')
var client = connect()

client
  .play('spotify:track:0JhKJg5ejeQ8jq89UQtnw8')
  .then(function () {
    return client.status()
  })
  .then(function (res) {
    if (res.body.running) {
      var track = res.body.track.track_resource.name
      var artist = res.body.track.artist_resource.name

      console.log(`Now playing ${track} from ${artist}`)
    } else {
      console.log('Start spotify!')
    }
  })
  .catch(console.log)
