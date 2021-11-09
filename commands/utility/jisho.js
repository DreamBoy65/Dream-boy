const { MessageEmbed } = require('discord.js');
const { toRomaji } = require('wanakana');
const fetch = require('node-fetch');
const Pages = require("../../helpers/paginate")
const { pagesCollector } = require("../../helpers/collector")
module.exports = {
  name: "jisho",
  aliases: [],
  group: "utility",
  description: "searches for Japanese word and kanji / nani if no query is provided. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["jisho nani"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try { 
      let query = args.join(" ") || "nani"
        
      const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURI(query)}`)
    .then(res => res.json())
    .catch(() => { return {}});

      if(res?.meta.status !== 200) return message.error("Unable to connect with jisho.")

      if(!res.data.length) return message.error("no data found for your query " + query)

      const pages = new Pages()

      const fields = res.data.filter(d => d.attribution.jmdict)
.map(data => {
      pages.add(new MessageEmbed()
               .setDescription([
          `**${data.slug}** - ${data.is_common ? 'Common Word' : 'Uncommon Word'}`,
          `**Kanji**: ${data.japanese.map(m => `${m.word || ''} *"(${m.reading || ''})"*`).join(' • ')}`,
          `**Romanized**: ${data.japanese.map(m => toRomaji(m.reading)).join('  ')}`,
          `**Definition**: ${data.senses[0].english_definitions}`,
          `**Restrictions**: ${data.senses[0].restrictions.join('\n') || 'None'}\n`,
          `**Notes**: ${[...data.senses[0].tags, ...data.senses[0].info].join(' • ')}`,
        ].join('\n'))
               .setAuthor(`🇯🇵 • Search Results for ${query}!`)
      .setFooter(`${pages.size} | Jisho @ Jisho.org | \©${new Date().getFullYear()} Dream`)
      .addField('\u200b',`[External Link](https://jisho.org/search/${query} '${query} on Jisho')`)
                .setColor("RANDOM")
               )
    })

      message.channel.send({embeds: [pages.firstPage]}).then(async msg => {
        await pagesCollector(msg, message.author, 60000, pages)
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}