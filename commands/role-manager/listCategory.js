const Schema = require("../../models/roles")
module.exports = {
  name: "rr-categories-list",
  aliases: [],
  group: "roles",
  description: "get a list of all reaction roles categories",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-categories-list"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args) => {
    try {
      const data = await Schema.find({id: message.guild.id})

      if(!data) return message.error("No categories found ..")

      message.sendE(`Total: ${data.length}\n\n` + data.map((c, i) => `${i+1}• ${c.category} | ${c.roles.length}`).join("\n"))
 } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}