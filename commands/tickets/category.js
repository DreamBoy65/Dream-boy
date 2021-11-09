module.exports = {
  name: "ticket-category",
  aliases: [],
  group: "ticket",
  description: "set the ticket category. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["ticket-category set name", "ticket-category remove"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let option = args[0]

    if(option === "set"){
    let category = await message.guild.channels.cache.find(c => c.name === args.slice(1).join(" ") && c.type === "GUILD_CATEGORY") || message.guild.channels.cache.get(args[1])
      if(!category) return message.error("Give name or id of the cate you want to set.")

      console.log(category.id)
        
      data.tickets.category = category.id
      await data.save()

      message.success("category is now set to " + category.name)
    } else if(option === "remove"){
      data.tickets.category = null
      await data.save()
      message.success("Successfully removed category.")
    } else {
      message.error("Option must be 'set' or 'remove'")
    }
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}