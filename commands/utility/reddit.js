const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Pages = require("../../helpers/paginate")
const { pagesCollector } = require("../../helpers/collector")

module.exports = {
  name: "reddit",
  aliases: ["subreddit"],
  group: "utility",
  description: "get an image by subreddit",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["reddit anime"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let subreddit = args.join(" ") || "anime"

      message.load("Fetching information from reddit.")
        
      let res = await fetch(`https://reddit.com/r/${subreddit}.json`)
    .then(res => res.json())
    .catch(() => null);

      if(!res || !res.data?.children || res.data?.length) return message.error("No Data found for your subreddit!")

      res = res.data.children.filter(m => m.data.post_hint === 'image');

      if(!res.length) return message.error("No Images found for your subreddit")

      if (!message.channel.nsfw){
      res = res.filter(m => !m.data.over_18)
    };
      
      if(!res.length) return message.error("Oiii! the data you are looking for is nsfw.")

      const pages = new Pages()   

      for(const { data } of res){
        pages.add(new MessageEmbed() 
        .setTitle(`${data.title}`)
        .setDescription(`>>> ID > ${data.id}`)
        .setImage(data.url)     
        .setFooter(`Results from reddit | ${pages.size} | ©${new Date().getFullYear()} Dream`)
        .setTimestamp(data.created_utc * 1000)
.setURL(`https://www.reddit.com${data.permalink}`)
        .setAuthor(`${data.author}`)
        .setColor("RANDOM")   
                 )
      }
      message.channel.send({embeds: [pages.firstPage]}).then(async msg => {
        pagesCollector(msg, message.author, 60000, pages)
      })
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}