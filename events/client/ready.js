const Schema = require("../../models/GuildProfile")

module.exports = async(client) => {

  client.guilds.cache.map(async g => {
    const data = await Schema.findOne({_id: g.id}) 

    if(!data) return;

    let cmds = []

    await data.custom?.slash?.map(c => {
      cmds.push({
        name: c.trigger,
        description: "Custom Commands.."
      })
    })

    await data.custom?.slash?.map(c => {
      g.commands.set(cmds)
    })
 })

  client.user.setPresence({ activities: [{ name: client.settings.client.presence.activity.name , type: client.settings.client.presence.activity.type}]});

  client.user.setStatus(client.settings.client.presence.status);
  
  client.logger.log(`Loading a total of ${client.commands.size} command(s).`, "log");
		client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} user(s) in ${client.guilds.cache.size} server(s).`, "ready");

}