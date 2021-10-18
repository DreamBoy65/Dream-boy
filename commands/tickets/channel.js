const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "ticket-channel",
  aliases: ["tc"],
  group: "ticket",
  description: "set or remove the ticket channel.",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["ticket-channel set #channel", "ticket-channel remove #channel"],
  cooldown: {
    time: 10000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    console.log(args)
      try {
      let option = args[0]
      
      if(option === "set"){
      let channel = await client.resolvers.resolveChannel({
   message,
   search: args[1],
   channelType: "GUILD_TEXT"
 })
        
        if(!channel){
          if(data.tickets.channel){
            return message.sendE(`Current ticket channel is ${client.channels.cache.get(data.tickets.channel)}`)
          } else {
            return message.error("Mention or give channel id to continue..")
          }
        } else if(channel){

          const embed = new MessageEmbed()
          .setTitle("Ticket System.")
          .setDescription("Click the button to open ticket. ʕ•ᴥ•ʔ")
          .setFooter("© " + client.user.username, client.user.displayAvatarURL())
        .setColor("BLUE");

          const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('ticket')
					.setLabel('Ticket')
					.setStyle('SUCCESS')
          .setEmoji(client.emoji.ticket)
			);

          if(channel && !channel.permissionsFor(message.guild.me).has("SEND_MESSAGES" || "EMBED_LINKS")) return message.error("I dont have permissions to send message and embed links in mentioned channel OwO")
          
let msg = await client.channels.cache.get(channel.id).send({embeds: [embed], components: [row]})

          data.tickets.channel = channel.id
          data.tickets.message = msg.id
            await data.save()

            message.success("Ticket channel is now set to " + channel.name)
        }
     }  else if(option === "remove"){
        data.tickets.channel = null
        await data.save()
        message.success("Successfully removed ticket channel.")
      } else {
        message.error("Option must be 'set' or 'remove'")
      }
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}