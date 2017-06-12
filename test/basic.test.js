var tape = require('tape')
var messages = require('../index.js')

var KEY = Buffer.from('01234567890123456789012345678901')
var BYTES = Buffer.from('12345678901234567890123456789012')
var HASH = Buffer.from('929bc22dec0e29b95b006b76634c7f50')

tape('Cancel', function (t) {
  var original = {
    index: 1,
    bytes: 20,
    hash: true
  }
  var coded = messages.Cancel.encode(original)
  t.same(messages.Cancel.decode(coded), original)
  t.end()
})

tape('Data', function (t) {
  var original = {
    index: 123,
    value: BYTES,
    nodes: [
      {
        index: 1,
        hash: HASH,
        size: 366
      },
      {
        index: 2,
        hash: HASH,
        size: 556
      }
    ],
    signature: BYTES
  }
  var coded = messages.Data.encode(original)
  t.same(messages.Data.decode(coded), original)
  t.end()
})

tape('Handshake', function (t) {
  var original = {
    id: BYTES,
    live: true
  }
  var coded = messages.Handshake.encode(original)
  t.same(messages.Handshake.decode(coded), original)
  t.end()
})

tape('Have - with default', function (t) {
  var original = {
    start: 23,
    bitfield: BYTES
  }
  var complete = {
    start: 23,
    length: 133,
    bitfield: BYTES
  }
  var defaulted = {
    start: 23,
    length: 1,
    bitfield: BYTES
  }
  var coded = messages.Have.encode(original)
  t.same(messages.Have.decode(coded), defaulted)
  coded = messages.Have.encode(complete)
  t.same(messages.Have.decode(coded), complete)
  t.end()
})

tape('Unhave', function (t) {
  var original = {
    start: 23
  }
  var complete = {
    start: 23,
    length: 133
  }
  var defaulted = {
    start: 23,
    length: 1
  }
  var coded = messages.Unhave.encode(original)
  t.same(messages.Unhave.decode(coded), defaulted)
  coded = messages.Unhave.encode(complete)
  t.same(messages.Unhave.decode(coded), complete)
  t.end()
})

tape('Want', function (t) {
  var original = {
    start: 23,
    length: 1
  }
  var coded = messages.Want.encode(original)
  t.same(messages.Want.decode(coded), original)
  t.end()
})

tape('Unwant', function (t) {
  var original = {
    start: 23,
    length: 12
  }
  var coded = messages.Unwant.encode(original)
  t.same(messages.Unwant.decode(coded), original)
  t.end()
})

tape('Header', function (t) {
  var original = {
    type: 'hyperdrive',
    content: KEY
  }
  var coded = messages.Header.encode(original)
  t.same(messages.Header.decode(coded), original)
  t.end()
})

tape('Node', function (t) {
  var original = {
    path: 'some/path',
    value: {
      mode: 1,
      uid: 2,
      gid: 3,
      size: 4,
      blocks: 5,
      offset: 6,
      byteOffset: 7,
      mtime: 8,
      ctime: 9
    },
    children: BYTES
  }
  var coded = messages.Node.encode(original)
  t.same(messages.Node.decode(coded), original)
  t.end()
})

tape('Stat', function (t) {
  var original = {
    mode: 1,
    uid: 2,
    gid: 3,
    size: 4,
    blocks: 5,
    offset: 6,
    byteOffset: 7,
    mtime: 8,
    ctime: 9
  }
  var coded = messages.Stat.encode(original)
  t.same(messages.Stat.decode(coded), original)
  t.end()
})

tape('Status', function (t) {
  var original = {
    uploading: true,
    downloading: false
  }
  var coded = messages.Status.encode(original)
  t.same(messages.Status.decode(coded), original)
  t.end()
})
