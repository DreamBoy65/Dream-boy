const { MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "avatar",
  aliases: ["pfp", "av"],
  group: "moderation",
  description: "get the avatar of Mentioned user.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["pfp @dream"],
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

      let button = new MessageButton()
      .setLabel("Link")    
      .setStyle("LINK")
      .setURL(member.user.displayAvatarURL({dynamic: true, size: 4096}))

      message.sendE(`${member.user.tag}'s Avatar`, {
        image: member.user.displayAvatarURL({dynamic: true, size: 4096}),
        row: new MessageActionRow().addComponents(button)
      })
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}