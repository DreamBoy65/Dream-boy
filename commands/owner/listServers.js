const Pages = require("../../helpers/paginate")
const {pagesCollector} = require("../../helpers/collector")
const {MessageEmbed} = require("discord.js")
const _ = require("lodash")
module.exports = {
  name: "list-servers",
  aliases: [],
  group: "owner",
  description: "get a list all servers",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  ownerOnly: true,
  memberPermissions: [],
  examples: ["list-servers"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      const pages = new Pages() 
        const guilds = _.chunk(client.guilds.cache.map(g => {
          return `**__Guild: ${g.name}\nId: ${g.id}\nOwner: ${client.users.cache.get(g.ownerId)?.username}#${client.users.cache.get(g.ownerId)?.discriminator}\nMembers: ${g.memberCount}__**`
      }), 5)

      for(const guild of guilds){
         pages.add(new MessageEmbed()
                  .setTitle("Server List | Dream-Boy " + "Total: " + client.guilds.cache.size)
                  .setDescription(guild.join("\n\n"))
                  .setFooter(`\©${new Date().getFullYear()} Dream`)
    .setTimestamp()
                   .setColor("RANDOM")
)
        message.channel.send({embeds: [pages.firstPage]}).then(async msg => {
          await pagesCollector(msg, message.author, 60000, pages)
        })
       
      }
   } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}