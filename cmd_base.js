module.exports = {
  name: "",
  aliases: [],
  group: "",
  description: "",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: [],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: (client, message, args) => {
    try {
      
    } catch (e) {
      message.error("Something went  wrong ;)..")
      console.log(e)
    }
  }
}