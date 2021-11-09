const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "github",
  aliases: ["git", "code"],
  group: "utility",
  description: "get the user account with name and repo",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["git dreamboy65"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      let account = args[0]
      let repo = args.slice(1).join(" ")

      if(!account) account = "DreamBoy65"
      
      if(account && !repo) {
        await fetchAc(message, account)
      } else {
        await fetchRepo(message, account, repo)
      }

      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}

async function fetchAc(message, acc) {
  
  let response = await fetch("https://api.github.com/users/"+ acc).then(res => res.json())

  if(!response) return message.error("No data found for query.")

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${response.login}(${response.id})`)
        .setURL(response.html_url)
        .setThumbnail(response.avatar_url)
        .setDescription(response.bio ? response.bio : 'No Bio')
        .addField('📢 | Public Repositories:', response.public_repos.toLocaleString()) 
        .addField('🌼 | Followers:', response.followers.toLocaleString())
        .addField('⏳ | Following:', response.following.toLocaleString()) 
        .addField('📧 | Email:', response.email ? response.email : 'No Email')
        .addField('📊 | Company:', response.company ? response.commands : 'No Company')
        .addField('📍 | Location:', response.location ? response.location : 'No Location')
        .setFooter(`\©${new Date().getFullYear()} Dream`)
    .setTimestamp() 


  return message.reply({embeds: [embed]})
}

async function fetchRepo(message, acc, repo) {
  let res = await fetch(`https://api.github.com/repos/${acc}/${repo}`).then(res => res.json())

  if(!res) return message.error("Unable to find that repo.")

  message.reply({embeds: [{
    author: {
                    name: res.owner.login,
                    icon_url: res.owner.avatar_url,
                    url: '',
                },
                description: `${res.description}\n[Repository Link](${res.html_url})`,
                fields: [
                    {
                        name: ':notepad_spiral: | Name:',
                        value: res.name,
                        inline: true
                    },
                    {
                        name: ':star: | Stars:',
                        value: res.stargazers_count.toString(),
                        inline: true,
                    },
                    {
                        name: ':gear: | Forks:',
                        value: res.forks.toString(),
                        inline: true,
                    },
                    {
                        name: ':desktop: | Language:',
                        value: res.language,
                        inline: true,
                    },
                ],
                image: {
                    url: res.owner.avatar_url
                },
                footer: {
                  text: `\©${new Date().getFullYear()} Dream`
                },
                color: "RANDOM", 
                timestamp: new Date()                        }]})
}