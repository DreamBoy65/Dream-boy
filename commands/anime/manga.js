const Pages = require("../../helpers/paginate")
const { pagesCollector } = require("../../helpers/collector")
const fetch = require("node-fetch")
const {MessageEmbed} = require("discord.js")
const text = require("../../util/string")
const moment = require("moment")
module.exports = {
  name: "manga",
  aliases: ["manhva"],
  group: "anime",
  description: "search manga by title",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["manga my hero academia"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args) => {
    try {
      let query = args.join(" ")

      if(!query) return message.error("gimme your query. ")

      await message.load(`Searching Manga for title **${query}**`, {timeOut: 5000})

      const data = await fetch(`https://api.jikan.moe/v3/search/manga?q=${encodeURI(query)}&page=1`).then( res => res.json())


      if(!data || data.error || !data.results.length){
        return message.error("No results found for query " + query + "\n• Try alternative names instead.")
      }
const elapsed = Date.now() - message.createdAt;
  
      const pages = new Pages()

    for (const res of data.results.slice(0,10)) {
      pages.add(
        new MessageEmbed()
        .setAuthor(res.title, res.image_url, res.url)
        .setColor('RANDOM')
        .setURL(res.url)
        .setFooter([
          `Search duration: ${Math.abs(elapsed / 1000).toFixed(2)} seconds`,
          `Page ${pages.size + 1} of ${data.results.slice(0,10).length}`,
          `Manga Query with MAL | \©️${new Date().getFullYear()} Dream `
        ].join('\u2000\u2000•\u2000\u2000'))
        .setImage(res.image_url)
        .addFields([
          { name: 'Type', value: res.type, inline: true },
          { name: 'Status', value: res.publishing ? 'Publishing' : 'Finished', inline: true},
          { name: 'Chapters', value: `${res.chapters}`, inline: true },
          { name: 'Members', value: text.commatize(`${res.members}`), inline: true },
          { name: 'Score', value: `${res.score}`, inline: true },
          { name: 'Volumes', value: `${res.volumes}`, inline: true },
          { name: 'Start Date', value: moment(res.start_date).format('dddd, Do MMMM YYYY'), inline: true },
          { name: 'End Date', value: res.end_date ? moment(res.end_date).format('dddd, Do MMMM YYYY') : 'Unknown', inline: true },
          { name: '\u200b', value: res.synopsis || '\u200b', inline: false }
        ])
      );
    }

      message.channel.send({embeds: [pages.firstPage]}).then(async msg => {
        pagesCollector(msg, message.author, 50000, pages)
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}