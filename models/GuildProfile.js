const { model, Schema } = require('mongoose');

module.exports = model('server_profiles', Schema({
  _id: String,
  prefix: {
    type: String, 
    default: null
  },
  tickets: {
    channel: {
      type: String, 
      default: null
    }, 
    category: {
      type: String, 
      default: null
    },
    uses: {
      type: Number, 
      default: 0
    },
    message: {
      type: String, 
      default: null
    },
    opened: {
      type: Array,
      default: []
    }
  },
  selfRoles: {
    type: Array,
    default: []
  },
  suggestion: {
    channel: {
      type: String,
      default: null
    }
  },
  custom: {
    commands: {
      type: Array,
      default: []
    },
    slash: {
      type: Array,
      default: []
    },
    response: {
      type: Array,
      default: []
    }
  },
  logs: {
    case: {
      type: Number,
      default: 0
    },
    log: {
      type: String,
      default: ""
    },
    dream: {
      type: String,
      default: ""
    }
  }
}))