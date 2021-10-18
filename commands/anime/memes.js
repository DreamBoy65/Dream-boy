const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

const fetch = require("node-fetch")
module.exports = {
  name: "animeme",
  aliases: ["anime-meme"],
  group: "anime",
  description: "shows an anime meme",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["animeme"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let data = await meme()

      const row = new MessageActionRow()
      .addComponents(new MessageButton()
      .setCustomId('refresh')
	    .setStyle('PRIMARY')
	    .setEmoji('🔄'))


      message.channel.send({embeds: [embed(data)], components: [row]}).then(msg => {
        let filter = m => m.user.id === message.author.id

    let collector = msg.createMessageComponentCollector({ filter, time: 90000 });

    collector.on("collect", async i => {
       
      let id = i.customId
      
      if(id === "refresh"){
        let data = await meme()
      msg.edit({embeds: [embed(data)]})
      }
    })

    collector.on("end", () => {
    msg.edit({components: []})
    })
      })
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}

async function meme(){

  const data = await fetch(`https://www.reddit.com/r/animemes.json`)
    .then(res => res.json())
    .catch(() => null);

  if (!data){
    return;
  };
let Data = data.data.children.filter(m => m.data.post_hint === "image" && !m.data.pinned)
    
  const {title, url, thumbnail, downs, ups, permalink} = Data[Math.floor(Math.random() * Data.length)].data

  const d = {
    title: title,
    image: url,
    link: "https://reddit.com/" + permalink,
    downs: downs,
    ups: ups,
    thumb: thumbnail
  }
  return d
};

function embed(data){
  const embed = new MessageEmbed()
  .setTitle(`${data.title}`)
  .setImage(data.image)
  .setDescription(`>>> UpVotes: ${data.ups}\nDownVotes: ${data.downs}`)
  .setFooter(`©${new Date().getFullYear()} Dream`)
  .setTimestamp()
  .setColor("RANDOM")
  .setURL(data.link)
  
  return embed;
}