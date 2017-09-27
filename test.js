var tape = require('tape')
var connect = require('./')

// requires spotify running

tape('spotify-local-control', function (t) {
  t.test('should play a track', function (t) {
    t.plan(1)
    var client = connect()

    client
      .play('spotify:track:0JhKJg5ejeQ8jq89UQtnw8')
      .then(function () {
        return client.status()
      })
      .then(function (res) {
        t.ok(res.body.playing)
      }).catch(function (err) {
        t.fail(err)
      })
  })

  t.test('should pause a track', function (t) {
    t.plan(1)
    var client = connect()

    client
      .play('spotify:track:0JhKJg5ejeQ8jq89UQtnw8')
      .then(function () {
        return client.pause()
      })
      .then(function () {
        return client.status()
      })
      .then(function (res) {
        t.notOk(res.body.playing)
      }).catch(function (err) {
        t.fail(err)
      })
  })

  t.test('should resume a track', function (t) {
    t.plan(1)
    var client = connect()

    client
      .play('spotify:track:0JhKJg5ejeQ8jq89UQtnw8')
      .then(function () {
        return client.pause()
      })
      .then(function () {
        return client.resume()
      })
      .then(function () {
        return client.status()
      })
      .then(function (res) {
        t.ok(res.body.playing)
      }).catch(function (err) {
        t.fail(err)
      })
  })
})
