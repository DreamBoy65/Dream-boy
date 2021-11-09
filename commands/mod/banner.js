const { MessageActionRow, MessageButton } = require("discord.js")
const axios = require("axios")
module.exports = {
  name: "banner",
  aliases: [],
  group: "moderation",
  description: "get the banner of Mentioned user.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["banner @dream"],
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

      const data = await axios
    .get(`https://discord.com/api/users/${member.user.id}`, {
     headers: {
      Authorization: `Bot ${client.token}`,
     },
    })
    .then((d) => d.data);

      if(!data.banner) return message.error("that user has no banner!")

      let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
      url = `https://cdn.discordapp.com/banners/${member.user.id}/${data.banner}${url}`;
    
      
      let button = new MessageButton()
      .setLabel("Link")    
      .setStyle("LINK")
      .setURL(url)

      message.sendE(`${member.user.tag}'s Avatar`, {
        image: url,
        row: new MessageActionRow().addComponents(button)
      })
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}