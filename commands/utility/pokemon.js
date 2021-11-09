const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const text = require("../../util/string")

module.exports = {
  name: "pokemon",
  aliases: ["poke"],
  group: "utility",
  description: "get a pokemon by name",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["poke pikachu", "pokemon bulbasaur"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let query = args.join(" ") || "pikachu"

      message.load("Fetching information from pokedex")

      const data = await fetch(`https://some-random-api.ml/pokedex?pokemon=${encodeURI(query)}`)
    .then(res => res.json())
    .catch(()=>null);

      if(!data || data.error) return message.error("No data found for your query or server unavailable. ")

      data.sprites = data.sprites || {};
    data.stats = data.stats || {};
    data.family.evolutionLine = data.family.evolutionLine || [];

      const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription('')
    .setThumbnail(data.sprites.animated || data.sprites.normal || null)
    .setAuthor(`Pokédex entry #${data.id} ${data.name.toUpperCase()}`,'https://i.imgur.com/uljbfGR.png', 'https://pokemon.com/us')
    .addFields([
      { name: 'Info', value: data.description || '???' },
      { name: 'Type', value: data.type.join('\n') || '???', inline: true },
      { name: 'Abilities', value: data.abilities.join('\n') || '???', inline: true },
      {
        name: 'Build', inline: true,
        value: [
          `Height: **${data.height || '???'}**`,
          `Weight: **${data.weight || '???'}**`,
          `Gender: **${text.joinArray(data.gender)}**`
        ].join('\n')
      },
      { name: 'Egg Groups', value: data.egg_groups.join('\n') || '???', inline: true },
      {
        name: 'Stats', inline: true,
        value: [
           `HP: **${data.stats.hp || '???'}**`,
           `ATK: **${data.stats.attack || '???'}**`,
           `DEF: **${data.stats.defense || '???'}**`
        ].join('\n')
      },
      {
        name: 'SP.Stats', inline: true,
        value: [
          `SP.ATK: **${data.stats.sp_atk || '???'}**`,
          `SP.DEF: **${data.stats.sp_def || '???'}**`,
          `SPEED: **${data.stats.speed || '???'}**`
        ].join('\n')
      },
      {
        name: "Total Stats",
        value: `${data.stats.total}`
      },
      {
        name: "Base Experience", 
        value: `${data.base_experience}`
      
      },
      {
        name: "Species",
        value: `${data.species.join("\n")}`
      },
      { name: 'Generation', value: data.generation || '???', inline: true },
      { name: 'Evolution Stage', value: text.ordinalize(data.family.evolutionStage || '???'), inline: true },
      { name: 'Evolution Line', value: data.family.evolutionLine.join(' \\👉 ') || '???', inline: true }
    ])
      .setFooter(`\©${new Date().getFullYear()} Dream`)
    .setTimestamp();

      message.channel.send({embeds: [embed]})

    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}