const { MessageEmbed } = require('discord.js');
const urban = require('relevant-urban');
const badwords = require('bad-words');
const filter = new badwords()

module.exports = {
  name: "urban",
  aliases: ["define", "urb"],
  group: "utility",
  description: "get an word definition",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["urban cute"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      if(!args.join(" ")) return message.error("Mention your word")

      if(filter.isProfane(args.join(" ")) && message.guild && !message.channel.nsfw) return message.error("Sry but you can't search for nsfw word in non nsfw channel. ")

      const data = await urban(encodeURI(args.join(' '))).catch(() => null);

      if(!data) return message.error("No data found for your query. ")

      const embed = new MessageEmbed() 
      .setTitle(data.word)
      .setDescription(">>> Definition:\n" + data.definition)
      .setURL(data.urbanURL)
      .addField("Example:", data.example ? data.example : "NoNe")
      .addField("Author:", data.author)
      .addField("Reviews:", `👍${data.thumbsUp} | 👎${data.thumbsDown}`)
      .setFooter(`\©${new Date().getFullYear()} Dream`)
      .setTimestamp()
      .setColor("RANDOM")

      message.channel.send({embeds: [embed]})      
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}