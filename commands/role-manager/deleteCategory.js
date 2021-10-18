const Schema = require("../../models/roles")
module.exports = {
  name: "rr-delete-category",
  aliases: [],
  group: "roles",
  description: "delete a role category",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-delete-category {category}"],
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

      await data.delete()

      message.success("Successfully deleted category named: "+ category)
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}