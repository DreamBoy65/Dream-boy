module.exports = {
  name: "rc-list",
  aliases: [],
  group: "custom",
  description: "get the list of server custom response commands.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["rc-list"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      if(!data.custom.response.length) return message.error("No custom commands found for this server..")

      message.sendE(data.custom.response.map((c, i) => `${i+1}• ${c.trigger} | ${c.res}`).join("\n"))

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}