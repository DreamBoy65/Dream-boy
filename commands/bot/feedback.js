
module.exports = {
  name: "feedback",
  aliases: [],
  group: "bot",
  description: "send the feedback to developers",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["feedback the best bot"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let msg = args.join(" ")

      if(!msg) return message.error("Mention your feedback.  ")

      let channel = client.channels.cache.get(client.config.channels?.feedback)

      await channel.createWebhook(message.author.tag, {
  avatar: message.author.displayAvatarURL()
}) 

        let web = await channel.fetchWebhooks()

      let webhook = web.find(c => c.name === message.author.tag)
        
      await webhook.send({content: msg}).then(w => {
        w.react("👍")
        w.react("👎")
      })

      await webhook.delete() 

      message.success("Feedback successfully submitted")
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}