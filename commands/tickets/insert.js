module.exports = {
  name: "ticket-insert",
  aliases: [],
  group: "ticket",
  description: "insert a member in ticket",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["ticket-insert @membet"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args, data) => {
    try {
      let user = await client.resolvers.resolveMember({
        message: message,
        search: args[0] 
      })

      if(!user || user.user.bot) return message.error("Ummm- i can't add ghost you know.")

      let ch = data.tickets.opened.find(c => c === message.channel.id)

      if(!ch) {
        return message.error("You can only delete a ticket... *baka*")
      }

      message.channel.permissionOverwrites.set([
	{
		id: user.user.id,
		allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
	},
]);
      await message.success(`${user.user.username} just hopped in..`)
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}