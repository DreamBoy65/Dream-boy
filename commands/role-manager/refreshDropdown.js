const Schema = require("../../models/roles")
const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js")
module.exports = {
  name: "rr-refresh-dropdown",
  aliases: [],
  group: "roles",
  description: "refresh dropdown roles by id",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-refresh-dropdown {#channel} {id} {category}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let channel = await client.resolvers.resolveChannel({
        message: message,
        search: args[0],
        channelType: "GUILD_TEXT"
      })
        
     let msgId = args[1]
     let category = args[2]   
       
      if(!channel) return message.error("Mention the channel where's the message is sent.")

      if(!msgId) return message.error("Oi! give me a valid msg id .")

      if(!category) return message.error("Mention a category too. *kiddo*")

      const data = await Schema.findOne({id: message.guild.id, category: category})

      if(!data) return message.error("Thats not a valid category..")

      let msg = await channel.messages.fetch(msgId)

      if(!msg.author.id === client.user.id) return message.error("I can only edit embed sent by me.")

      if(!msg.embeds[0]) return message.error("Thats not an embed. ")

if(!msg?.components[0]?.components[0]?.customId === "dr") return message.error("Thats not a self roles embed.")
      const dropdownsOptions = [];

		for (const role of data.roles) {
	
      dropdownsOptions.push({ emoji: role.emoji, label: role.name, value: role.role, description: `click this to get the ${message.guild.roles.cache.get(role.role).name} role!`.substr(0, 50) });                   
		}

		const dropdown = new MessageSelectMenu().setCustomId('dr');


      dropdown.options = dropdownsOptions;

      const row = new MessageActionRow().addComponents([dropdown]);

     await msg.edit({components: [row]})

      message.success("Successfully refreshed self roles.")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}