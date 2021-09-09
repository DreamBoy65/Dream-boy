const settings = {
  
  client: {
    presence: {
      activity: {
        name: 'Oh My Lord! | .',
        type: 'COMPETING'
      }
    },
    // Disable Mentions except Users
    allowedMentions: {parse: ['users']},
    // Sweep messages every 12 hours
    messageCacheLifetime: 43200,
    messageSweepInterval: 43200
  },



  prefix: '.',

  channels: { 
    debug: '885156123974459424', 
    votes: '', 
    uploads: '', 
    logs: '885156192769421324' 
  },


  database: {
    enable: true,
    uri: process.env.MONGO_URI,
    config: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4
    }
  },
  

  owners: [ '813299347819069520' ],

  
};

module.exports = settings;