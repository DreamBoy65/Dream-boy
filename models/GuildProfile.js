const { model, Schema } = require('mongoose');

module.exports = model('server_profiles', Schema({
  _id: String,
  prefix: { type: String, default: null },
  tickets: {
    channel: { type: String, default: null}, 
    category: { type: String, default: null},
  }
}))