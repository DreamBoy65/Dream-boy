const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")
const Pages = require("../../helpers/paginate")
const { pagesCollector } = require("../../helpers/collector")


module.exports = {
  name: "npm",
  aliases: ["package", "npmjs"],
  group: "utility",
  description: "get information about  npm package",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["npm discord-welcome-bot"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let query = args.join(" ")

      if(!query) return message.error("Query is not provided. ")

      let response = await fetch('https://api.npms.io/v2/search?q=' + query).then(res => res.json())

      if(response.total === 0) {
        return message.error("No Data found for your query. ")
      }
      
      let pages = new Pages()

      for(const Res of response.results){
        let res = Res.package
          
        pages.add(
          new MessageEmbed()  
          .setTitle(`${res.name}`) 
          .setThumbnail("https://cdn.discordapp.com/emojis/902577481104646164")
          .setDescription(res.description || "???")
          .setURL(res.links.npm)
          .addField("👑 | Author:", res.author?.name || "???")
          .addField("📥 | Publisher:", `UserName: ${res.publisher?.username || "???"}\nEmail: ${res.publisher?.email || "???"}`)
          .addField("⚙ | Version:", res.version)
          .addField("📨 | Repo:", res.links?.repository || "???")
          .addField("🧮 | Maintainers:", res.maintainers?.map((m, i) => `${i+1}• ${m.username}`).join("\n"))
          .addField("🔑 | Keywords:", res.keywords?.join("\n") || "???")
          .setColor("RANDOM")
          .setFooter(`${response.total} - ${pages.size}\©${new Date().getFullYear()} Dream`)
          .setTimestamp(res.date) 

        )
      }

      message.reply({embeds: [pages.firstPage]}).then(async msg => {
        await pagesCollector(msg, message.author, 60000, pages)
      })
      
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}