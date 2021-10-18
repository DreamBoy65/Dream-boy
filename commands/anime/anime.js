const {getInfoFromName} = require("mal-scraper")
const {MessageEmbed} = require("discord.js")
module.exports = {
  name: "anime",
  aliases: [],
  group: "anime",
  description: "search a anime from name",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["anime my hero academia"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let anime = args.join(" ")

      if(!anime) message.error("Provide a anime name.")

     const data = await getInfoFromName(anime, true)
  .then((data) => {return data})

const isHentai = data.genres.some(x => x === 'Hentai');
   
if(!data){
  return message.error("data doesn't exist.\nTry: different name or season.")
} else if(isHentai){
  return message.error("Data is nsfw.")
}


      
      
      const embed = new MessageEmbed()
      .setTitle(data.title)
      .setURL(data.url)
      .setColor("RANDOM")
      .setDescription(data.synopsis)
      .setImage(data.picture)
 .setThumbnail(data.characters[Math.floor(Math.random() * data.characters.length)].picture)
       .addField("Type:", data.type || "unknown")
        .addField("Episodes:", data.episodes || "unknown")
        .addField("Aired:", data.aired || "unknown")
        .addField("BroadCast:", data.broadcast || "unknown")
        .addField("Producers:", data.producers.join(" , ") || "unknown")
        .addField("Studios:", data.studios.join(" , ") || "unknown")
        .addField("Source:", data.source || "unknown")
        .addField("Duration:", data.duration || "unknown")
        .addField("Score:", data.score)
        .addField("ScoreStats:", data.scoreStats)
        .addField("Rating:", data.rating)
        .addField("Genres:", data.genres.join(" , ") || "unknown")
        .addField("Rank:", data.ranked || "unknown")
        .addField("Popularity:", data.popularity || "unknown")
      .setFooter(`©${new Date().getFullYear()} Dream`, message.author.displayAvatarURL())
   .setTimestamp()  
    message.channel.send({embeds: [embed]})
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}