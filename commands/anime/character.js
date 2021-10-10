const { MessageEmbed } = require('discord.js');
const _ = require('lodash');
const fetch = require("node-fetch")

const text = require('../../util/string');

module.exports = {
  name: 'character',
  aliases: [ 'anichar' , 'char' , 'c' ],
  cooldown: {
    time: 10000,
    message: 'You are going too fast. Please slow down to avoid getting rate-limited!'
  },
  clientPermissions: [ 'EMBED_LINKS' ],
  group: 'anime',
  description: `Searches for a character in [MyAnimeList](https://myanimelist.net "Homepage"), or Mai\'s character information if no query is provided.`,
  parameters: [ 'Search Query' ],
  examples: [
    'character',
    'anichar Mai',
    'anichar Sakuta Azusagawa',
    'char Rio Futaba',
    'c Kaede Azusagawa'
  ],
  run: async (client, message, args) => {
const badge = `${client.emoji.mal} [MyAnimeList](https://myanimelist.net \'Homepage\')`;

    const query = args.join(' ') || `Deku`;

    let msg = await message.load(`Finding character for you. query: ${query}`, {timeOut: 5000}) 

    let data = await fetch(`https://api.jikan.moe/v3/search/character?q=${encodeURI(query)}&page=1`).then(res => res.json());


    const errstatus = {
      404: `No results were found for **${query}**!\n\nIf you believe this character exists, try their alternative names.`,
      429: `I am being rate-limited in ${badge}. Please try again Later`,
      400: `Could not access ${badge}. The site might be currently down at the moment`,
      503: `Could not access ${badge}. The site might be currently down at the moment`,
    }
  
      if(!data || data.error){
      return message.error(errstatus[data.status])
    }
      
    const { results : [ { mal_id } ] } = data;

    let res = await fetch(`https://api.jikan.moe/v3/character/${mal_id}`)
    .then(res => res.json())
    .catch(() => {});

    if(!res || res.error){
      return message.error(errstatus[res.error])
    }

    const embed = new MessageEmbed()
    .setTitle(`${res.name} | ${res.name_kanji}`)
    .setDescription(res.about)
    .setImage(res.image_url)
.setThumbnail("https://cdn.discordapp.com/emojis/893793345707593759.gif?v=1")
    .addField("AnimeoGraphy:", res.animeography?.map(c => `**Name: [${c.name}](${c.url})\nRole: ${c.role}**`).slice(0, 5).join("\n\n"))
    .addField("MangaoGraphy:", res.mangaography?.map(c => `**Name: [${c.name}](${c.url})\nRole: ${c.role}**`).slice(0, 5).join("\n\n"))
    .addField("Voice Actors:", res.voice_actors?.map(c => `**Name: [${c.name}](${c.url})\nLanguage: ${c.language}**`).slice(0, 5).join("\n\n"))
    .setFooter("Seach by Mal, Dream-Boy-")
    .setColor("RANDOM")
    
    message.channel.send({embeds: [embed]})
  }
};