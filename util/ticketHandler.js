const Schema = require("../models/GuildProfile")
const {MessageActionRow, MessageEmbed, MessageButton} = require("discord.js")

module.exports = {
  handleTicketSystem: async function(client, interaction) {
    let data = await Schema.findOne({_id : interaction.message.guildId})  
if(!data) return;
  
if(interaction.isButton()){
     
    if(interaction.customId === "ticket"){
      let channel = data.tickets.channel
      let category = data.tickets.category
      let message = data.tickets.message
        
      if(interaction.message.channelId === channel && interaction.message.id === message){
        const Channel = await interaction.member.guild.channels.create(`Ticket-${data.tickets.uses}`, {
				parent: category ? category : null,
				permissionOverwrites: [
					{
						id: interaction.message.guild.id,
						deny: ['VIEW_CHANNEL']
					},
					{
						id: interaction.message.author.id,
						allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
					}
				]
			})
       data.tickets.uses = data.tickets.uses + 1
       data.tickets.opened.push(Channel.id)
        await data.save()
        await interaction.reply({content: "Ticket opened!\nHead to " + `<#${Channel.id}>`, ephemeral: true})

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
        client.channels.cache.get(Channel.id).send({embeds: [embed], components: [row]})
      }
    }
   if(interaction.customId === "ticket-close"){
     interaction.reply({content: "Deleting this Ticket in 5sec."})
    setTimeout(() => {
      interaction.message.channel.delete()
    }, 5000)
   }
 }
  }
}