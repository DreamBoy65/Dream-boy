const { MessageEmbed } = require("discord.js")
const Pages = require("../../helpers/paginate")
const { pagesCollector } = require("../../helpers/collector")
const ytsr = require('@distube/ytsr');

module.exports = {
  name: "yt-search",
  aliases: ["yt-music"],
  group: "utility",
  description: "find yt videos",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["yt-search anything"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let query = args.join(" ")

      if(!query) return message.error("Query is not provided. ")

      await message.load("Fetching information from YouTube...")
      
      let data = await ytsr(query, {safeSearch: true, limit: 10})

      if(!data) return message.error("No data found for your query...") 

      let pages = new Pages()  

      let verified = {
        true: "Yes!",
        false: "No!"
      }

      for(const res of data.items){
        pages.add(
          new MessageEmbed()  
         .setTitle(res.name)
         .setThumbnail(res.thumbnail)
         .setURL(res.url)
         .setDescription(res.descrition ? res.descrition : "???")   
         .addField("Author:", `Name: [${res.author.name}](${res.author.url})\n\nBadges: ${res.author.ownerBadges.length ? res.author.ownerBadges.join(" , ") : "???"}\nVerified: ${verified[res.author.verified]}`)
         .addField("ID:", res.id)
         .addField("Type:", res.type)
         .addField("Views:", res.views.toString())
         .addField("Duration:", res.duration)
         .addField("IsLive:", verified[res.isLive])    
         .addField("UploadedAt:", res.uploadedAt)
         .setFooter(`\©${new Date().getFullYear()} Dream`)
         .setTimestamp() 
         .setColor("RANDOM")
        )
      }

      message.reply({embeds: [pages.firstPage]}).then(async msg => {
        pagesCollector(msg, message.author, 60000, pages)
      })
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}