const { MessageEmbed } = require('discord.js');
const _ = require('lodash');
const fetch = require('node-fetch');
const { pagesCollector } = require("../../helpers/collector")
const Pages = require("../../helpers/paginate")
const text = require("../../util/string")
const types =  [ 'TV', 'ONA', 'OVA', 'Movie', 'Special', '-' ];

module.exports = {
  name: "upcoming",
  aliases: [],
  group: "anime",
  description: "get a list of upcoming anime.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["upcoming TV", "upcoming ova"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  run: async(client, message, args) => {
    try {
      let type = args[0]

      if (types.some( x => x.toLowerCase() === type?.toLowerCase())){
      type = types[types.findIndex(c => c.toLowerCase() === type?.toLowerCase())];
    } else {
      type = null;
    };

      let res = await fetch(`https://api.jikan.moe/v3/season/later`).then(res => res.json());

      if(!res || res.error){
        message.error(`Sorry. but my anime list responded with ${res?.status ? res.status : "Not Found"}`)
      }

      await message.load(`Fetching upcoming anime type **${type || "All"}`)

     if (types.includes(type)){
      res.anime = res.anime.filter(f => f.type === type);
    };

    const chunks = 8;
    const descriptions = _.chunk(res.anime.map(anime => {
      return text.truncate([
        `**[${anime.title}](https://myanimelist.net/anime/${anime.mal_id})**`,
        `\`${[ !type ? ' ' + anime.type : null, text.joinArray(anime.genres.map(x => x.name))].filter(Boolean).join('\u2000\u2000|\u2000\u2000')} \``,
        anime.synopsis.replace(/\r\n/g,' ').replace('(No synopsis yet.)','')
      ].filter(Boolean).join('\n'), Math.floor(2000 / chunks))
    }), chunks);

    const pages = new Pages();
    let index = 0;

    for (const anime of descriptions){
      pages.add(
        new MessageEmbed()
        .setColor('GREY')
        .setAuthor(`Upcoming Anime List\u2000|\u2000Type: ${type || 'ALL'}`)
        .setDescription(anime.join('\n\n'))
        .setFooter([
          `Upcoming Anime Query with MAL`,
          `Page ${index + 1} of ${descriptions.length}`,
          `\©️${new Date().getFullYear()} Dream `
        ].join('\u2000|\u2000'))
      );
      index++;
    };

      message.channel.send({embeds: [pages.firstPage]}).then(async msg => {
        await pagesCollector(msg, message.author, 50000, pages)
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}