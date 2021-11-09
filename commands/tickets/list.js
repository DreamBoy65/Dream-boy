const { pagesCollector } = require("../../helpers/collector")

module.exports = {
  name: "ticket-list",
  aliases: [],
  group: "ticket",
  description: "get the list of all opened tickets.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER", 
"MANAGE_CHANNELS" ],
  examples: ["ticket-list"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let channels = data.tickets.opened.map((c, i) => {
        return `${i+1} • <#${c}>`
      });

      if(!channels) {
        message.error("i didn't found any ticket.")
       }

      message.sendE(channels.join("\n"))
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}