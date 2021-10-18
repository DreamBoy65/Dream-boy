const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const { AnimeWallpaper } = require("anime-wallpaper");

const wall = new AnimeWallpaper();

module.exports = {
  name: "aniwallpaper",
  aliases: [],
  group: "anime",
  description: "get an anime wallpaper",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["aniwallpaper"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {

      let wall = await wallPaper() 

      let wal = wall[Math.floor(Math.random() * wall.length)]
    
      const embed = new MessageEmbed()
      .setTitle(wal.title)
      .setColor(`RANDOM`)
      .setImage(wal.image)
      .setTimestamp()
      .setFooter(`Anime Wallpaper | \©${new Date().getFullYear()} Dream`)
        
      let down = new MessageButton()
      .setLabel("Link")
	    .setStyle('LINK')
	    .setURL(wal.image)

      const row = new MessageActionRow().addComponents(down)

      message.reply({embeds: [embed], components: [row]})
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}

async function wallPaper() {
    const wallpaper = await wall.getAnimeWall3()
    return wallpaper
}
