const settings = {
  
  client: {
    presence: {
      activity: {
        name: 'Oh My Lord! | .',
        type: 'COMPETING'
      },
    }
  },

  bot: {
    scopes: "bot%20applications.commands",
    perms: "8"
  },

  prefix: '.',

  channels: { 
    debug: '897855850566279268', 
    votes: '898122983309185064', 
    uploads: '902510751544123412', 
    guildJoin: '897855850188783744',
    guildLeave: "897855850188783745",
    feedback: "898122720221470730"
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