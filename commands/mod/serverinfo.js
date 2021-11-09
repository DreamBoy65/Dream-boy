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
      .addField("📍 | Name:", ">>> " + guild.name)
      .addField("🆔️ | ID:", ">>> " + guild.id)
      .setThumbnail(guild.iconURL())
      .addField("👑 | Owner:", ">>> " + client.users.cache.get(guild.ownerId).tag)
      .addField("✒ | Features:", ">>> " + guild.features.join(" , ") || ">>> ???")
      .addField("👨‍👩‍👧‍👦 | Members:", `>>> 👥 | Total: ${guild.memberCount}\n👤 | Humans: ${guild.members.cache.filter(m => !m.user.bot).size}\n🤖 | Bots: ${guild.members.cache.filter(m => m.user.bot).size}`)
      .addField("🗨 | Channels:", `>>> 📨 | Total: ${guild.channels.cache.size}\n💬 | TEXT: ${guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size}\n🗣 | Voice: ${guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size}`)
      .addField("😁 | Emojis & Stickers:", `>>> 😶 | Emojis: ${guild.emojis.cache.size}\n😅 | Simple: ${guild.emojis.cache.filter(c => !c.animated).size}\n🤠 | Animated: ${guild.emojis.cache.filter(c => c.animated).size}\n😉 | Stickers: ${guild.stickers.cache.size}`)
      .addField("✔ | VerificationLevel:", ">>> " + guild.verificationLevel)
      .addField("🧨 | Boost:", ` >>> 🎚 | Level: ${guild.premiumTier}\n⬆️ | Count: ${guild.premiumSubscriptionCount}`)
      .setColor("RANDOM")
      .setFooter(`\©${new Date().getFullYear()} Dream`)
      .setTimestamp() 

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