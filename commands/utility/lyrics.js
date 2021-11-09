const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const text = require('../../util/string');
const Page = require('../../helpers/paginate');
const { pagesCollector } = require("../../helpers/collector")
module.exports = {
  name: "lyrics",
  aliases: [],
  group: "utility",
  description: "get a lyrics of given song / astronaut in the Ocean if no query is provided. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["lyrics dayByDay"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      const query =  args.join(' ') || 'astronaut in the ocean';

    const data = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURI(query)}`)
    .then(res => res.json())
    .catch(() => null);

      if(!data || data.error) return message.error("data doesn't exist for your query " + query)

      if (data.lyrics.length < 2000){
      return message.channel.send({embeds: [
        new MessageEmbed()
        .setColor('GREY')
        .setDescription(data.lyrics)
        .setThumbnail(data.thumbnail.genius)
        .setFooter(`Lyrics | \©${new Date().getFullYear()} Dream `)
        .setAuthor(`${data.title}\n${data.author}`, null, data.links.genius)
      ]});
    };

    const lyrics_array = data.lyrics.split('\n');
    const lyrics_subarray = [ '' ];
    let n = 0;

    for (const line of lyrics_array){
      if (lyrics_subarray[n].length + line.length < 2000){
        lyrics_subarray[n] = lyrics_subarray[n] + line + '\n'
      } else {
        n++
        lyrics_subarray.push(line);
      };
    };

    const pages = new Page(
      lyrics_subarray.map((x,i) =>
        new MessageEmbed()
        .setColor('GREY')
        .setDescription(x)
        .setThumbnail(data.thumbnail.genius)
        .setFooter([
          `Page ${i+1} of ${lyrics_subarray.length}`,
          `Lyrics | \©${new Date().getFullYear()} Dream`
        ].join( '\u2000•\u2000' ))
        .setAuthor(`${data.title}\n${data.author}`, null, data.links.genius)
      )
    );

    const msg = await message.channel.send({embeds: [pages.currentPage]}).then(async msg => {
      await pagesCollector(msg, message.author, 60000, pages)
    })

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}