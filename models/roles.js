const { model, Schema } = require('mongoose');

module.exports = model('server_roles', Schema({
  id: String,
  category: {
    type: String,
    default: null
  },
  roles: {
    type: Array,
    default: []
  }
}))