const { MessageActionRow, MessageButton } = require("discord.js")
module.exports = {
  name: "invite",
  aliases: ["botinvite"],
  group: "bot",
  description: "get an invite link to bot",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["invite"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {

      let bot = client.settings.bot
        
      let row = new MessageActionRow().addComponents(new MessageButton().setLabel("INVITE").setStyle("LINK").setURL(`https://discord.com/oauth2/authorize/?permissions=${bot.perms}&scope=${bot.scopes}&client_id=${client.user.id}`).setEmoji("🎉"))

      message.sendE("You are qt.", {
        row: row
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}