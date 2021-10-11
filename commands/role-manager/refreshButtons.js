const Schema = require("../../models/roles")
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  name: "rr-refresh-buttons",
  aliases: [],
  group: "roles",
  description: "refresh button roles by id",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-refresh-buttons {#channel} {id} {category}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args) => {
    try {
      let channel = await client.resolvers.resolveChannel({
        message: message,
        search: args[0],
        channelType: "GUILD_TEXT"
      })
        
     let msgId = args[1]
     let category = args[2]   
       
      if(!channel) return message.error("Mention the channel where's the message is sent.")

      if(!msgId) return message.error("Oi! give me a valid msg id .")

      if(!category) return message.error("Mention a category too. *kiddo*")

      const data = await Schema.findOne({id: message.guild.id, category: category})

      if(!data) return message.error("Thats not a valid category..")

      let msg = await channel.messages.fetch(msgId)

      if(!msg.author.id === client.user.id) return message.error("I can only edit embed sent by me.")

      if(!msg.embeds[0]) return message.error("Thats not an embed. ")

if(!msg?.components[0]?.components[0]?.customId.startsWith("br:")) return message.error("Thats not a self roles embed.")
      let buttons = []
      let rows = []
      for(const role of data.roles){
        const button = new MessageButton()
      .setCustomId(role.role)
      .setLabel(role.name)
      .setEmoji(role.emoji ? role.emoji : null)
      .setStyle("PRIMARY")

      buttons.push(button)      
    }

    for (let i = 0; i < Math.ceil(data.roles.length / 5); i++) {
			rows.push(new MessageActionRow());
		}
		rows.forEach((row, i) => {
			row.addComponents(buttons.slice(0 + (i * 5), 5 + (i * 5)));
		});

     await msg.edit({components: rows})

      message.success("Successfully refreshed self roles.")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}