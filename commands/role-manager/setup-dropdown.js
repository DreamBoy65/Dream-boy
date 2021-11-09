const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const Schema = require("../../models/roles")
module.exports = {
  name: "rr-setup-dropdown",
  aliases: [],
  group: "roles",
  description: "setup dropdown roles .",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-setup-dropdown #roles pings min/max"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      const channel = await client.resolvers.resolveChannel({
        message: message,
        search: args[0],
        channelType: "GUILD_TEXT" 
    })

      const category = args[1]
      const min = args[2]
      const max = args[3]
      
      if(!channel) return message.error("Mention the channel where you want to setup roles.")

      if(!category) return message.error("Mention a valid category. ")

      const data = await Schema.findOne({id: message.guild.id, category: category})	

      if(!data) return message.error("That category doesn't exist..")
      
     const dropdownsOptions = [];

		for (const role of data.roles) {
			
      dropdownsOptions.push({ emoji: role.emoji, label: role.name, value: role.role, description: `click this to get the ${message.guild.roles.cache.get(role.role).name} role!`.substr(0, 50) });                   
		}

		const dropdown = new MessageSelectMenu().setCustomId('dr')

      if(min) {
        if(isNaN(min)) return message.error("Minimum value should be a number!")
        if(min < 1) return message.error("Minimum value should be more than 1 or equal to one!")
        if(min > data.roles.length) return message.error("Minimum value should be less than roles length. ")
        dropdown.setMinValues(parseInt(min))
      }

      if(max) {
        if(isNaN(max)) return message.error("Maximum value should be a number!")
        if(max < 1) return message.error("Maximum value should be more than 1 or equal to one!")

        if(max > data.roles.length) return message.error("Maximum value should be less than roles length. ")
        dropdown.setMaxValues(parseInt(max))
      }


      dropdown.options = dropdownsOptions;

      const row = new MessageActionRow().addComponents([dropdown]);

      const embed = new MessageEmbed()
    .setTitle("Select to get your roles")      
    .setFooter(`\©${new Date().getFullYear()} - Dream`)
    .setTimestamp()      

 client.channels.cache.get(channel.id).send({embeds: [embed], components: [row]})

      message.success("Successfully created self roles.")
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}