const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "userinfo",
  aliases: ["whois"],
  group: "moderation",
  description: "user information",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["whois @dream"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let member = await client.resolvers.resolveMember({
        message,
        search: args.join(" ")
      }) || message.member

      const permissions = member.permissions.toArray().map(perm => {
      return perm
        .toLowerCase()
        .replace(/_/g, " ") // Replace all underscores with spaces
        .replace(/\w\S*/g, txt => {
          // Capitalize the first letter of each word
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    })

        let joinPosition;
    const members = []
      await message.guild.members.cache.map(m => members.push(m))
      
    members.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < members.length; i++) {
      if (members[i].user.id == member.user.id)
        joinPosition = i;
    }
      

      const embed = new MessageEmbed()
      .setTitle(`Who is ${member.user.username} | ${member.user.id}`)
      .addField("🗣 | NickName:", member.nickname || "???")
      .addField("📥 | JoinedAt:", `${member.joinedAt.toDateString()} at ${member.joinedAt.toTimeString()}`)
      .addField("⛔ | Permissions:", permissions.map(p => `\`${p}\``).join(" | "))
      .addField("📩 | JoinPosition:", Math.floor(joinPosition + 1).toString())      
        .addField("💮 | Roles:", "Total: " + member._roles.length + "\n\n" + member._roles.slice(0, 20).map(r => `<@&${r}>`).join(" , "))
        .addField("📢 | Acknowledgements:", member.user.id === message.guild.ownerId ? "Owner" : message.member.permissions.has("MANAGE_MESSAGES") ? "Moderator" : "Member")
      .setThumbnail(member.user.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter(`\©${new Date().getFullYear()} Dream`)
      .setTimestamp() 

      message.channel.send({embeds: [embed]})

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}