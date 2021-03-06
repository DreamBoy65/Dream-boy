const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "serverinfo",
  aliases: ["svrinfo"],
  group: "moderation",
  description: "get information about server. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["svrinfo", "serverinfo"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let guild = message.guild

      const embed = new MessageEmbed()
      .setTitle("Server Information")
      .setDescription(guild.description || "???")
      .addField("๐ | Name:", ">>> " + guild.name)
      .addField("๐๏ธ | ID:", ">>> " + guild.id)
      .setThumbnail(guild.iconURL())
      .addField("๐ | Owner:", ">>> " + client.users.cache.get(guild.ownerId).tag)
      .addField("โ | Features:", ">>> " + guild.features.join(" , ") || ">>> ???")
      .addField("๐จโ๐ฉโ๐งโ๐ฆ | Members:", `>>> ๐ฅ | Total: ${guild.memberCount}\n๐ค | Humans: ${guild.members.cache.filter(m => !m.user.bot).size}\n๐ค | Bots: ${guild.members.cache.filter(m => m.user.bot).size}`)
      .addField("๐จ | Channels:", `>>> ๐จ | Total: ${guild.channels.cache.size}\n๐ฌ | TEXT: ${guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size}\n๐ฃ | Voice: ${guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size}`)
      .addField("๐ | Emojis & Stickers:", `>>> ๐ถ | Emojis: ${guild.emojis.cache.size}\n๐ | Simple: ${guild.emojis.cache.filter(c => !c.animated).size}\n๐ค  | Animated: ${guild.emojis.cache.filter(c => c.animated).size}\n๐ | Stickers: ${guild.stickers.cache.size}`)
      .addField("โ | VerificationLevel:", ">>> " + guild.verificationLevel)
      .addField("๐งจ | Boost:", ` >>> ๐ | Level: ${guild.premiumTier}\nโฌ๏ธ | Count: ${guild.premiumSubscriptionCount}`)
      .setColor("RANDOM")
      .setFooter(`\ยฉ${new Date().getFullYear()} Dream`)
      .setTimestamp()โ

      if(guild.banner){
        embed.setImage(guild.bannerURL())
      }


      message.channel.send({embeds: [embed]})
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}