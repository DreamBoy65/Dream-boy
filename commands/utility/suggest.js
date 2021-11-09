const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  name: "suggest",
  aliases: [],
  group: "utility",
  description: "suggest something to server!",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["suggest invite dream bot"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let suggestion = args.join(" ")

      if(!suggestion) return message.error("Suggest something..")

      if(!data.suggestion.channel) return message.error("This Server has not setup suggestion channel yet")

      let channel = message.guild.channels.cache.get(data.suggestion.channel)

     if(!channel) return message.error("Suggest channel not found o.o")

     const embed = new MessageEmbed()
      .setTitle(message.author.tag, message.author.displayAvatarURL())
      .setDescription(">>> " + suggestion)
      .setColor("RANDOM")
      .setFooter(`\©${new Date().getFullYear()} Dream`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()

    let button3 = new MessageButton()
    .setCustomId('s-accept')
	  .setLabel('Accept')
	  .setStyle('SUCCESS')
	  .setEmoji("🟢");

    let button4 = new MessageButton()
    .setCustomId('s-deny')
	  .setLabel('Deny')
	  .setStyle('DANGER')
	  .setEmoji("🔴");

    let row1 = new MessageActionRow()
      .addComponents(button3, button4)

    channel.send({embeds: [embed], components: [row1]}).then(async msg => {
      msg.react("👍")
      msg.react("👎")
    })

      message.success("Suggestion submitted. ")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}