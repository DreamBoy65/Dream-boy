module.exports = {
  name: "rc-delete",
  aliases: [],
  group: "custom",
  description: "delete custom response command.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["rc-delete hello"],
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

      if(!data.custom.response.find(c => c.trigger === trigger)) return message.error("Unable to find command with that trigger..")

      data.custom.response = data.custom.response.filter(c => c.trigger !== trigger)

      await data.save()
      
      message.success("Successfully deleted command. ")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}