const settings = require("../config/config")

module.exports = (client) => {
  client.logger.log("Logging In!", "log")
  client.logger.log(`Serving on ${client.guilds.cache.size} Servers\nTo ${client.users.cache.size} users `, "log")
client.guildProfiles.load()
client.user.setPresence({ activities: [{ name: settings.client.presence.activity.name }], status: 'idle' , type: settings.client.presence.activity.type});
}