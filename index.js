const config = require(`${process.cwd()}/config/config`);


const Angel = require("./base/angel"),
	client = new Angel(config);

const options = {
  bypass: true,
  log: true,
  paths: ["bot"]
};

client.loadCommands({ parent: 'commands', ...options });

client.loadEvents({ parent: 'events', ...options });

client.database?.init()

require("./helpers/extenders")


client.login(process.env.DTOKEN)