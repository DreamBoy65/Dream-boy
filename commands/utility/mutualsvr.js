module.exports = {
  name: "mutualsvr",
  aliases: ["mutualservers"],
  group: "utility",
  description: "check your mutual servers with bot.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["mutualsvr"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let servers = []

      await client.guilds.cache.map(g => {
        if(g.members.cache.get(message.member.user.id)){
          servers.push(g.name)
        }
      })

      message.sendE(`Total Servers: ${servers.length}\n\n` + servers.map((g, i) => `${i+1}• ${g}`).join("\n"))
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}