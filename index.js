const config = require(`${process.cwd()}/config/config`);
const chalk = require("chalk")

console.log(chalk.red("Starting up..."))

const Dream = require("./struct/Client"),
	client = new Dream(config);

const options = {
  bypass: true,
  log: true,
  paths: ["bot", "tickets", "anime", "role-manager", "owner", "utility", "setup", "custom", "mod"]
};

client.loadCommands({ 
  parent: 'commands', 
  ...options 
});

client.loadEvents({ 
  parent: 'events', 
  ...options,
  dirs: ["client", "guild", "logs"]
});

client.database?.init()

client.listentoProcessEvents([
  'unhandledRejection',
  'uncaughtException'
], { ignore: false });

client.login(process.env.DTOKEN)