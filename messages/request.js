var fs = require('fs')
var path = require('path')
var protobuf = require('protocol-buffers')

module.exports = protobuf(fs.readFileSync(path.resolve(__dirname, '../schema/request.schema.proto')))
