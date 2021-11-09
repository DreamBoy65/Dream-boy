module.exports = {
  name: "cc-delete",
  aliases: [],
  group: "custom",
  description: "delete custom command.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["cc-delete hello"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let trigger = args[0]

      if(!trigger) return message.error("Mention the command trigger you want to delete.")

      if(!data.custom.commands.find(c => c.trigger === trigger)) return message.error("Unable to find command with that trigger..")

      data.custom.commands = data.custom.commands.filter(c => c.trigger !== trigger)

      await data.save()
      
      message.success("Successfully deleted command. ")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}