module.exports = {
  name: "ticket-channel",
  aliases: ["tc"],
  group: "ticket",
  description: "set or remove the ticket channel.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["ticket-channel set #channel", "ticket-channel remove #channel"],
  cooldown: {
    time: 10000,
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