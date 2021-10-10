const Schema = require("../../models/roles")
module.exports = {
  name: "rr-add",
  aliases: [],
  group: "roles",
  description: "add a role into the category. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-add {category} {@role} {name}" || "rr-add pings, @chat-ping, chat-revive"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args) => {
    try {
      let arg = args.join(" ").split(",")

      let category = `${arg[0]}` 

      let role = message.guild.roles.cache.get((arg[1].match(/\d{17,19}/)||[])[0]) ||
      message.guild.roles.cache.find(r => r.name === role);


      let name = `${arg[2]}`

      let data = await Schema.findOne({id: message.guild.id, category: category})

      if(!category || !data) return message.error("That category doesn't exist. ");

      if(!role) return message.error("that role already exists. ");

      if(!name) return message.error("give a name too.");

      const msg = await message.channel.send({embeds: [{
        title: "React with emoji you want to set.",
        color: "RANDOM"
      }]})

      const filter = (reaction, user) => {
     return user.id === message.author.id
}   

      await msg.awaitReactions({filter, max: 1, time: 30000, errors: ["time"]}).then(async collected => {
        const reaction = collected.first()
        
        if(!reaction) return;

        data.roles.push({
        name: name,
        role: "br:"+ role.id,
        emoji: reaction.emoji.id ? reaction.emoji.id : reaction.emoji.name
      })

      await data.save()
      
      message.success(`Role added with name: ${name} to ${category}`)
      })
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}