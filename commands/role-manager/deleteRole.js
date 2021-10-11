const Schema = require("../../models/roles")
module.exports = {
  name: "rr-delete-role",
  aliases: [],
  group: "roles",
  description: "delete a specific role from a category",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-delete-role {category} {roleName}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args) => {
    try {
      let category = args[0]
      
      let role = args.slice(1).join(" ")
      let data = await Schema.findOne({id: message.guild.id, category: category})

      if(!data) return message.error("that category doesn't exist. ")

      if(!role) return message.error("Mention a roleName *baka*")
      
      let rr = await data.roles.map(c => c).find(c => c.name === ` ${role}`)

      if(!rr) return message.error("That role doesn't exist OwO. ")


      data.roles = data.roles.filter(c => c.name !== ` ${role}`)

      await data.save()

      message.success("Successfully deleted role named: " + role + " From : " + category)
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}