# dat protocol buffers

This is a convenience implementation of the protocol buffers for the [dat protocol](www.datproject.org) as defined in the [dat white paper](https://github.com/datproject/docs/blob/master/papers/dat-paper.pdf).

Although this package can be used to decode or encode any dat protocol buffers. It is particularly useful for decoding download events from [dat-node](https://github.com/datproject/dat-node) or [hyperdrive](https://github.com/mafintosh/hyperdrive).

## install

`npm install dat-protocol-buffers`

## How to use

You can import all the message specification simple my importing the base module

```js
var messages = require('dat-protocol-buffers')
```

or individually

```js
var messages = require('dat-protocol-buffers/messages/{name-of-protocol}')
// e.g. var messages = require('dat-protocol-buffers/messages/node')
// e.g. var messages = require('dat-protocol-buffers/messages/handshake')
```

Listening to dat download events:
```js
Dat(dir, { key: somekey, sparse: true }, function (err, dat) {
  const stats = dat.trackStats();
  dat.joinNetwork();
  dat.network.once('connection', function () {
    console.log('I connected to someone!')
    dat.archive.metadata.on('download', (i, d) => {
      if(i === 0) {
        const header = messages.Header.decode(d);
        console.log('HEADER', header);
      } else {
          const block = messages.Node.decode(d);
          console.log('BLOCK', block);
      }
    })
  })
})
```

### Protocols currently supported:

- Cancel
- Data
- Handshake
- Have
- Header
- Register
- Request
- Node
- Stat
- Status
- Want
- Unhave
- Unwant
