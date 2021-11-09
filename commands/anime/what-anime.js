const fetch = require('node-fetch');
const Pages = require("../../helpers/paginate")
const { pagesCollector } = require("../../helpers/collector")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "what-anime",
  aliases: ["w-anime"],
  group: "anime",
  description: "find an anime by attachment or picture",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["what-anime {URL}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let url = args[0] || message.attachments.first()

      if(!url) message.error("Attach an attachment or give me a URL *sus*")

      if(!url.url && !url.startsWith("https" || "http")) return message.error("Enter a valid URL *dum#*")

      await message.load("Fetching information from trace.moe")

      const res = await fetch(
			`https://api.trace.moe/search?cutBorders&anilistInfo&url=${encodeURIComponent(
				url.url ? url.url : url
			)}`
		).then(e => e.json());

      let datas;

      if(!message.channel.nsfw && message.guild){
        datas = res.result.map(r => r).filter(r => !r.anilist.isAdult)
     } else {
        datas = res
     }

      if(!datas.length) return message.error("No Data found for your query. ")

    const pages = new Pages()

    for(const data of datas){
      pages.add(new MessageEmbed()
               .setColor("RANDOM")
               .setTitle("Search with trace.moe")
               .setImage(data.image)
               .setDescription(`>>> ID: ${data.anilist.id}\n\nTitles:\nEnglish: ${data.anilist.title.english}\nRomanji: ${data.anilist.title.romanji}\nNative: ${data.anilist.title.native}`)
                .addField("Synonyms:", `${data.anilist?.synonyms?.length ? data.anilist.synonyms.join("\n") : "Not Provided."}`)
                .addField("Episodes:", `${data.episodes}`)
                .addField("Duration:", `${formatTime(data.from)} - ${formatTime(data.to)}`) 
                .addField("Similarity:", `${Math.floor(data.similarity * 100).toFixed(2)}` + "%")
                .setFooter(`\©${new Date().getFullYear()} Dream`)
                .setTimestamp()
               )
      }

      message.reply({embeds: [pages.firstPage]}).then(async msg => {
        await pagesCollector(msg, message.author, 60000, pages)
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}

const formatTime = (timeInSeconds) => {
  const sec_num = parseInt(timeInSeconds, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;
  return [hours, minutes, seconds]
    .map((e) => e.toString().padStart(2, "0"))
    .slice(hours > 0 ? 0 : 1)
    .join(":");
}; 
