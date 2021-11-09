let Schema = require("../../models/GuildProfile")
const { MessageEmbed } = require("discord.js")
module.exports = {
  handleSuggestions: async function(client, interaction) {
    if(!["s-deny", "s-upvote", "s-downvote", "s-accept"].includes(interaction.customId)) return;

    let data = await Schema.findOne({_id: interaction.guildId})

    if(!data) return;
      
    if(interaction.customId === "s-accept"){
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "Only Admin can use this button!", ephemeral: true})
      let resson

     const filter = m => m.author.id === interaction.user.id

interaction.reply({content: "Tell me the reason.", ephemeral: true})
	.then(() => {
		interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
			.then(collected => {
        reason = collected.first().content

        collected.first().delete()
          interaction.message.edit({embeds: [
        new MessageEmbed(interaction.message.embeds[0])
        .addField(`Approved by ${interaction.message.author.username}`, 
 `Reason: ${reason}`)
        .setColor("GREEN")
      ], components: []})
        
				interaction.followUp({content: "Successfully accepted the suggestion!", ephemeral: true})
			})
			.catch(() => {
				return;
			});
	});
    }

    if(interaction.customId === "s-deny"){
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "Only Admin can use this button!", ephemeral: true})
      let resson

     const filter = m => m.author.id === interaction.user.id

interaction.reply({content: "Tell me the reason.", ephemeral: true})
	.then(() => {
		interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
			.then(collected => {
        reason = collected.first().content

        collected.first().delete()
          interaction.message.edit({embeds: [
        new MessageEmbed(interaction.message.embeds[0])
        .addField(`Denied by ${interaction.message.author.username}`, 
 `Reason: ${reason}`)
        .setColor("GREEN")
      ], components: []})
        
				interaction.followUp({content: "Successfully denied the suggestion!", ephemeral: true})
			})
			.catch(() => {
				return;
			});
	});
    }
  }
}