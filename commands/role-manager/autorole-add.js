module.exports = {
  name: "autorole-add",
  aliases: [],
  group: "roles",
  description: "give roles to user when they joined the server.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["autorole-add {@role}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(c => c.name === args[0])

      if(!role) return message.error("Mention or give me id of role.")

      let rol = data.selfRoles.find(c => c === role.id)

      if(rol) return message.error("that role already exists..")
      
      data.selfRoles.push(role.id)
      await data.save()

      message.success(`Successfully added ${role.name} to self Roles`)
        
        } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}