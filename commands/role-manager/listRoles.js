const Schema = require("../../models/roles")
module.exports = {
  name: "rr-roles-list",
  aliases: [],
  group: "roles",
  description: "get a list of all roles in a category",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-roles-list {category}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let category = args[0]

      let data = await Schema.findOne({id: message.guild.id, category: category})

      if(!data) return message.error("that category doesn't exist. ")

      if(!data.roles.length) return message.error("WELL, that category is empty *lol*")

      message.sendE(`Total: ${data.roles.length}\n\n${data.roles.map((c, i) => `${i+1}• ${c.name}`).join("\n")}`)
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}