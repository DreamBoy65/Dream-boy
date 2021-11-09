const { STATUS_CODES } = require("http")

module.exports = {
  name: "http",
  aliases: ["cathttp"],
  group: "utility",
  description: "get information about https codes.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["http 200"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let code = args[0]

      if(!STATUS_CODES[code]) return message.error("Thats not a valid code *baka*")

      message.sendE(STATUS_CODES[code], 
{
  image: `https://http.cat/${code}.jpg`
} )

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}