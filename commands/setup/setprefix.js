module.exports = {
  name: "setprefix",
  aliases: [],
  group: "setup",
  description: "set the server prefix",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["setprefix $"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let prefix = args[0]

      if(!prefix) return message.error("Okkk so prefix is not provided. ")

      if(prefix.length > 5) return message.error("Prefix must be smaller than 6 characters/digits/symbols")

      data.prefix = prefix 
      await data.save()

      message.success("Successfully changed prefix for this server.")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}