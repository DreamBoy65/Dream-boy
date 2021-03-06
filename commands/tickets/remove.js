module.exports = {
  name: "ticket-remove",
  aliases: [],
  group: "ticket",
  description: "remove a member from the ticket",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["ticket-remove @member"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
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
		deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES"],
	},
]);
      await message.success(`${user.user.username} just jumped out..`)
        
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}