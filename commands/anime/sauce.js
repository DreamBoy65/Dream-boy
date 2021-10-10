const SauceNAO = require('saucenao')
require('moment-duration-format');
const { MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const moment = require('moment');
const { API } = require('nhentai-api');
const api = new API();
const mySauce = new SauceNAO(process.env.SAUCE_NAO)
const { pagesCollector } = require("../../helpers/collector")
const Pages = require('../../helpers/paginate');

module.exports = {
  name: "sauce",
  aliases: ["gimmesauce"],
  group: "anime",
  description: "fetch doujin info.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["sauce 001010"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: true,
  run: async(client, message, args) => {
    try {
     let id = args[0]

      if(!id || isNaN(id)) return message.error("Provide your sauce. ")

      message.load("fetching information...", {timeOut: 5000})

      const book = await api.getBook(id).catch(()=>null);

    if (!book){
      const embed = new MessageEmbed()   
   .setColor('RED')
      .setAuthor('None Found','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
      .setDescription(`**${message.member.displayName}**, couldn't find doujin with sauce **${id}**.`)
      .setThumbnail('https://i.imgur.com/qkBQB8V.png')

      return await message.channel.send({embeds: [embed]});
    }

      const { title: { english, japanese, pretty },
            tags, pages, uploaded, cover } = book

    const embed = new MessageEmbed()
    .setColor('GREY')
    .setFooter(`Doujin Query | \©️${new Date().getFullYear()} Dream. `)
    .setAuthor(pretty, null, `https://nhentai.net/g/${id}`)
    .setDescription(`**${book.title.english}**\n*${book.title.japanese}*`)
    .setThumbnail(api.getImageURL(cover))
      .addField("Tags:", book.tags.map(m => m.name).join(" • "))
      .addField("Pages:", `${book.pages.length}`)
      .addField("Uploaded On:", `${moment(book.uploaded).format('dddd Do MMMM YYYY') + '\n' + 
          moment.duration(Date.now() - book.uploaded).format('Y [Years] M [Months, and] D [Days]') + 
          ' ago.'
}`)
    .addField("Link:", `**[LINK](https://nhentai.net/g/${id})**` + 
          ` *Click here to proceed to ${book.title.pretty}\'s nHentai Page*`
       )      
      .setImage(api.getImageURL(cover))
    
      message.channel.send({embeds: [embed]})
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}