module.exports = {
  name: "autorole-list",
  aliases: [],
  group: "roles",
  description: "give roles to user when they joined the server.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["autorole-list"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {

      let roles = data.selfRoles

      if(!roles.length) return message.error("No Auto-Roles found..")

      message.sendE(`Total: ${roles.length}\n\n${roles.map((c, i) => `${i+1}• <@&${c}>`).join("\n")}`)
        
        } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}