const Schema = require("../../models/roles")
  
  module.exports = {
  name: "rr-create",
  aliases: [],
  group: "roles",
  description: "create a role category and add roles in it.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-create pings"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args) => {
    try {
      let name = args.join(" ")

      let data = await Schema.findOne({id: message.guild.id, category: name})
      
      if(data) return message.error("Umm- That category already exists..")

      const newData = new Schema({id: message.guild.id, category: name})
      
      await newData.save()

      message.success("Category created now you can add roles.")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}