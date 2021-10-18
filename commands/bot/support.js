module.exports = {
  name: "support",
  aliases: [],
  group: "bot",
  description: "sends you link to my support server!",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["support"],
  cooldown: {
    time: 5000,
    message: "Slow Down! Kiddo."
  },
  nsfw: false,
  guildOnly: false,
  run: (client, message, args) => {
    
  }
}