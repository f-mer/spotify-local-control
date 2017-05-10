#!/usr/bin/env node

var connect = require('./')
var client = connect()

var usage = `
  Usage:
    $ spotify-local-control <command>

  Commands:
    <default>    Show usage
    play <uri>   Play a track
    status       Show artist and track
    pause        Pause the current track
    resume       Resume the current track

  Examples:
    $ spotify-local-control play spotify:track:0JhKJg5ejeQ8jq89UQtnw8
`

main(process.argv.slice(2))

function main (argv) {
  var cmd = argv[0]

  if (cmd === 'play') {
    var uri = argv[1]
    return client.play(uri).then(success).catch(error)
  } else if (cmd === 'status') {
    return client.status().then(function (res) {
      if (res.body.running) {
        var track = res.body.track.track_resource.name
        var artist = res.body.track.artist_resource.name

        console.log(`${track} - ${artist}`)
        success()
      } else {
        error()
      }
    })
  } else if (cmd === 'pause') {
    return client.pause(uri).then(success).catch(error)
  } else if (cmd === 'resume') {
    return client.resume(uri).then(success).catch(error)
  } else {
    console.log(usage)
    error()
  }
}

function success () {
  return process.exit(0)
}

function error () {
  return process.exit(1)
}
