const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")
const Schema = require("../../models/roles")
module.exports = {
  name: "rr-setup-buttons",
  aliases: [],
  group: "roles",
  description: "setup button roles system",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-setup-buttons {category}"],
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
      
      let category = args.slice(1).join(" ")

      if(!channel) return message.error("Mention a channel *umm-*")

      let data = await Schema.findOne({id: message.guild.id, category: category})

      if(!data) return message.error("That category doesn't exist..")

    let buttons = []
    let rows = []

    for(const role of data.roles){
        const button = new MessageButton()
      .setCustomId("br:" + role.role)
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

    const embed = new MessageEmbed()
    .setTitle("Click on buttons to get your roles")      
    .setFooter(`\©${new Date().getFullYear()} - Dream`)
    .setTimestamp()      
      client.channels.cache.get(channel.id).send({embeds: [embed], components: rows})

      message.success("Successfully created self roles.")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}