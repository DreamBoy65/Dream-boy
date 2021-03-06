const { Client, Collection, Intents } = require("discord.js")
const CommandManager = require(`../struct/commands/Manager`);
const consoleUtil = require(`../util/console`);
const { readdirSync } = require('fs');
const { join } = require('path');
const Mongoose = require("../struct/mongoose")
const processEvents = require(`../util/processEvents`);

class Dream extends Client {
  constructor (settings = {}){
    super({
      intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES
			],
			allowedMentions: {
				parse: ["users"]
			},
      partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    })

    this.logger = require("../helpers/logger")
    this.commands = new CommandManager(this)
this.emoji = require("../config/emojis")
    this.settings = require("../config/config")
    this.resolvers = require("../helpers/resolvers")
    this.database = null;
    require("../helpers/extenders")

    if (settings.database?.enable === true){
      this.database = new Mongoose(this, settings.database);
    }

    this.config = {
      prefix: settings.prefix || '.',
      features: [],
      owners: [],
      channels: { debug: null, uploads: null, guildJoin: null, guildLeave: null, votes: null, feedback: null },
      websites: settings.websites
    };

    /**
     * Channel ID used by the bot to log errors when enabled.
     * @type {?Snowflake}
     */
    if (typeof settings.channels?.debug === 'string'){
      this.config.channels.debug = settings.channels.debug;
    } else {
      // Do nothing...
    };

    /**
     * Channel ID used by the bot to send vote messages
     * @type {?Snowflake}
     */
    if (typeof settings.channels?.votes === 'string'){
      this.config.channels.votes = settings.channels.votes;
    } else {
      // Do nothing...
    };

    /**
     * Channel ID used by the bot to send feedback messages
     * @type {?Snowflake}
     */
    if (typeof settings.channels?.feedback === 'string'){
      this.config.channels.feedback = settings.channels.feedback;
    } else {
      // Do nothing...
    };

    /**
     * Channel ID used by the bot to upload files for some commands that necessitates uploads.
     * @type {?Snowflake}
     */
    if (typeof settings.channels?.uploads === 'string'){
      this.config.channels.uploads = settings.channels.uploads;
    } else {
      // Do nothing...
    };

    if (typeof settings.channels?.guildJoin === 'string'){
      this.config.channels.guildJoin = settings.channels.guildJoin;
    } else {
      // Do nothing...
    }

    if (Array.isArray(settings.owners)){
      if (settings.owners.length){
        this.config.owners = settings.owners;
      } else {
        // Do nothing
      };
    } else {
      // Do nothing
    };
   
   if (typeof settings.channels?.guildLeave === 'string'){
      this.config.channels.guildLeave = settings.channels.guildLeave;
    } else {
      // Do nothing...
    };



 }





loadCommands(settings = {}){
    let log = true;
    const bypass = Boolean(settings.bypass);

    if (typeof settings.log === 'boolean'){
      log = settings.log;
    };

    function check(){
      if (!bypass){ process.exit(); } else { return true; };
    };

    if (typeof settings.parent !== 'string'){
      if (log) consoleUtil.warn('Command parent folder not set, reverting to default directory \'commands\'', '[BOT WARN]');
      settings.parent = 'commands';
    };

    this.commands.parent = settings.parent;

    if (!settings.paths?.length){
      settings['paths'] = ['']
    };

    if (!Array.isArray(settings.paths)){
      if (log) { consoleUtil.error(`INVALID_COMMAND_PATH: No Paths to load commands from.`, 'path'); };
      if (check()) return;
    };

    if (!(this.commands instanceof CommandManager)){
      this.commands = new CommandManager({ groups: settings.groups });
    };

    for (let dir of settings.paths){
      if (Array.isArray(dir)){
        dir = join(...dir);
      };

      let files = null;

      try {
        files = readdirSync(join(process.cwd(), settings.parent, dir))
        .filter(f => f.split('.').pop() === 'js');
      } catch {
        if (log){
          consoleUtil.error(`DIR_NOT_FOUND: Cannot resolve path '${join(process.cwd(), settings.parent, dir)}'`, 'dir');
        };
        if (check()) continue;
      };

      for (const file of files){
        this.commands.add(require(join(process.cwd(), settings.parent, dir, file)), { log, bypass });
      };
    };

    if (log){
      consoleUtil.success(`Loaded ${this.commands.size} commands!`)
    };
  };

  /**
   * Load event files to this client instance
   * @param {LoadEventSettings} settings The settings for loading the events
   * @returns {void}
   */
  loadEvents(settings = {}){

    const log = settings.log && typeof settings.log === 'boolean';
    const bypass = settings.bypass && typeof settings.bypass === 'boolean';

    function check(){
      if (!bypass){ process.exit(); } else { return true; };
    };

    if (typeof settings.parent !== 'string'){
      if (log){
         consoleUtil.warn('Events parent folder not set, reverting to default directory \'events\'');
      } else {
        // Do nothing...
      };
      settings.parent = 'events';
    };

    let files = null;

    try {
      const load = (dirs) => {
      const events = readdirSync(`./${settings.parent}/${dirs}/`).filter((d) => d.endsWith("js"));

  for (const file of events) {
      const evt = require(`../events/${dirs}/${file}`);
      const eName = file.split(".")[0];
      this.on(eName, evt.bind(null, this));
  }
        consoleUtil.success(`Loaded ${events.length} events of ${dirs}.`)
 };

     settings.dirs?.forEach(x => load(x))

    } catch (e) {
     consoleUtil.warn("Error while loading events. " + e)
   }
      
  }

  //Load Events
  listentoProcessEvents(events = [], config = {}){
    if (!Array.isArray(events)){
      return;
    };

    if (typeof config !== 'object'){
      config = {};
    };

    for (const event of events){
      process.on(event, (...args) => {
        if (config.ignore && typeof config.ignore === 'boolean'){
          return;
        } else {
          return processEvents(event, args, this);
        };
      });
    };
  };
}


module.exports = Dream;