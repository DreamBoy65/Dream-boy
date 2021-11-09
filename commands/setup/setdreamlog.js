module.exports = {
  name: "setdreamlog",
  aliases: [],
  group: "setup",
  description: "set the mod logs channel",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["setdreamlog set #logs"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      
      if(!["set", "remove"].includes(args[0]?.toLowerCase())) return message.error("ummm- Thats not a valid option \noptions: set / remove")

      if(args[0].toLowerCase()== "set"){
        let channel = await client.resolvers.resolveChannel({
        message: message,
        search: args.slice(1).join(" "),
        channelType: "GUILD_TEXT"
      })

        if(!channel) return message.error("Mention a channel!")

        if(!channel.permissionsFor(message.guild.me).has("SEND_MESSAGES" || "EMBED_LINKS")) return message.error("I dont have to send embeds in that channel")
                                                                
        
        data.logs.dream = channel.id
        await data.save()

        message.success("Logs channel is set to " + channel.name)
      }

      if(args[0].toLowerCase()== "remove"){
        data.logs.dream = null
        await data.save()

        message.success("Successfully removed Logs channel")
      }
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}