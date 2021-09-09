module.exports = {
  name: "ping",
  aliases: [],
  group: "general",
  description: "replies with pong!",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["ping"],
  cooldown: {
    time: 5000
  },
  nsfw: false,
  run: (client, message, args) => {
    message.sendE("PONG!")
  }
}