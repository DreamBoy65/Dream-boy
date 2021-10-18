const {MessageActionRow, MessageEmbed, MessageButton} = require("discord.js")

module.exports = {
  name: "ticket-create",
  aliases: [],
  group: "ticket",
  description: "create a ticket.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS", "MANAGE_CHANNELS"],
  memberPermissions: [],
  examples: ["ticket-create"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: (client, message, args, data) => {
    try {
      message.guild.channels.create(`Ticket-${data.tickets.uses}`,{
        parent: data.tickets.category,
				permissionOverwrites: [
					{
						id: message.guild.id,
						deny: ['VIEW_CHANNEL']
					},
					{
						id: message.author.id,
						allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
					}
				]
      }).then(async channel => {
        const embed = new MessageEmbed()
        .setTitle("Welcome to Ticket.")
        .setDescription("Describe your issues here.")  
        .setColor("RANDOM")
        .setTimestamp() 

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("ticket-close")
					.setLabel('Close')
					.setStyle('DANGER')
          .setEmoji(client.emoji.close)
			);
        channel.send({embeds:[embed], components: [row]})
        message.channel.send("Ticket created.\nHead to " + `${channel}`)
      data.tickets.uses = data.tickets.uses + 1

    data.tickets.opened.push(channel.id)

        await data.save()
        
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}