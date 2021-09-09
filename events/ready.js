const settings = require("../config/config")

module.exports = (client) => {
  client.logger.log("Logging In!", "log")

client.user.setPresence({ activities: [{ name: settings.client.presence.activity.name }], status: 'idle' , type: settings.client.presence.activity.type});
}