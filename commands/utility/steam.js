const html2md = require('html2markdown');
const { MessageEmbed } = require('discord.js');
const { decode } = require('he');
const fetch = require('node-fetch');
const text = require('../../util/string');

module.exports = {
  name: "steam",
  aliases: [],
  group: "utility",
  description: "search for a steam game",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["steam dota2"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      const query = args.join(' ') || 'Doki Doki Literature Club';

    const res = await fetch(`https://store.steampowered.com/api/storesearch/?cc=us&l=en&term=${encodeURI(query)}`)
    .then(res => res.json())
    .catch(() => null);

    if (!res || !res.total){
      return message.error(`Could not find **${query}** on steam`);
    };

    const body = await fetch (`https://store.steampowered.com/api/appdetails/?cc=us&l=en&appids=${res.items[0].id}`)
    .then(res => res.json())
    .catch(() => null);

    if (!body){
      return message.error(`\\❌ Could not find **${query}** on steam`);
    };

     const data = body[res.items[0].id].data;
    const platformLogo = { windows: client.emoji.windows , mac: client.emoji.mac, linux: client.emoji.linux};
    const platformrequirements = { windows: 'pc_requirements', mac: 'mac_requirements', linux: 'linux_requirements' };
    const current = (data.price_overview?.final || 'Free').toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const original = (data.price_overview?.initial || 'Free').toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const price = current === original ? current : `~~~${original}~~~ ${current}`;
    const platforms = Object.entries(data.platforms).filter(([platform, has]) => has)
    .map(([platform]) => { return {
      name: '\u200b', inline: true,
      value: `${platformLogo[platform]} ${decode(html2md(data[platformrequirements[platform]].minimum)).split('* **Additional Notes:')[0]}`
    }});
    platforms[0].name = 'System Requirements';

    return message.channel.send({embeds: [
      new MessageEmbed()
      .setColor(0x101D2F)
      .setTitle(data.name)
      .setImage(res.items[0].tiny_image)
      .setURL(`https://store.steampowered.com/app/${data.steam_appid}`)
      .setFooter(`Steam @ Steam.Inc©️  | \©${new Date().getFullYear()} Dream`)
      .addFields([
        { name: 'Price', value: `•\u2000 ${price}`, inline: true },
        { name: 'Metascore', value: `•\u2000 ${data.metacritic?.score||'???'}`, inline: true },
        { name: 'Release Date', value: `•\u2000 ${data.release_date?.data||'???'}`, inline: true },
        { name: 'Developers', value: data.developers.map(m => `• ${m}`).join('\n'), inline: true },
        { name: 'Categories', value: data.categories.map(m => `• ${m.description}`).join('\n'), inline: true },
        { name: 'Genres', value: data.genres.map(m => `• ${m.description}`).join('\n'), inline: true },
        { name: '\u200b', value: text.truncate(decode(data.detailed_description.replace(/(<([^>]+)>)/ig,' ')),980)},
        { name: 'Supported Languages', value: `\u2000${text.truncate(html2md(data.supported_languages), 997)}`},
        ...platforms
      ])
    ]});
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}