const config = require(`${process.cwd()}/config/config`);

const Dream = require("./struct/Client"),
	client = new Dream(config);

const options = {
  bypass: true,
  log: true,
  paths: ["bot", "tickets", "anime", "role-manager", "owner", "utility"]
};

client.loadCommands({ parent: 'commands', ...options });

client.loadEvents({ parent: 'events', ...options });

client.database?.init()

client.listentoProcessEvents([
  'unhandledRejection',
  'uncaughtException'
], { ignore: false });

require("./helpers/extenders")

client.login(process.env.DTOKEN)