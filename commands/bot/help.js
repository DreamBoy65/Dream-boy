const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const didYouMean = require("didyoumean")
const {readdirSync} = require("fs")
const Images = require("discord-images")
const images = new Images.Client()
const Pages = require("../../helpers/paginate")
const { pagesCollector } = require("../../helpers/collector")
const _ = require("lodash")

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  group: "bot",
  description: "Help Command!",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["help"],
  cooldown: {
    time: 5000
  },
  nsfw: false,
  guildOnly: false,
  run: (client, message, args) => {
   try{
     if(args[0]){
     let commands = []    

client.commands.registers.map(c => commands.push(c.name))

     const command = args[0]
     let cmd = client.commands.get(command)

     let dum = didYouMean(command, commands)

     if(!cmd) return message.error(dum ? "That command does not exist OwO\nDid You Mean **"+dum+"** ?" : "That command does not exist OwO")

     const embed = new MessageEmbed()
     .setTitle("Help Command ? • " + command)
     .setDescription("Command information.")
     .addField(`**__Name__**`, `>>> • ${cmd.name}`)
     .addField(`**__Description__**`, cmd.description ? ">>> • " + cmd.description : ">>> Not Provided.")
     .addField("**__Aliases__**", cmd.aliases.length ? ">>> • " + cmd.aliases.join(" , ") : ">>> • Not Provided")
     .addField("**__Group__**", cmd.group ? ">>> • " + cmd.group : ">>> • Not Provided.")
     .addField("**__Examples__**", cmd.examples.length ? ">>> • " + cmd.examples.join("\n") : ">>> • Not Provided.")
     .addField("**__Parameters__**", cmd.parameters.length ? cmd.parameters.join("\n") : ">>> • Not Provided.")
     .addField("**__Guild Only__**", cmd.guildOnly ? ">>> • True." : ">>> • False.")
     .addField("**__Admin Only__**", cmd.adminOnly ? ">>> • True." : ">>> • False.")
      .addField("**__Owner Only__**", cmd.ownerOnly ? ">>> • True." : ">>> • False.")
       
      .addField("**__Nsfw__**", cmd.nsfw ? ">>> • True." : ">>> • False.")
      .addField("**__CoolDown Time__**", ">>> • " + cmd.cooldown.time)
      .addField("**__Bot Permissions__**", cmd.clientPermissions.length ? ">>> • " + cmd.clientPermissions.join(" , ") : ">>> • Not Provided.")
       .addField("**__Member Permissions__**", cmd.permissions.length ? ">>> • " + cmd.permissions.join(" , ") : ">>> • Not Provided.")
       .setTimestamp()   
       .setColor("RANDOM")
  
.setImage("https://media.discordapp.net/attachments/885113922489815052/885540471533862962/20210909_203127.jpg")
     
       message.channel.send({embeds:[embed]})
       
   } else {
       
     let dirss = []
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select to get my commands! UwU')
      )

categories = [...new Set(client.commands.registers.map((cmd) => cmd.group))];
  

for(const Dir of categories){
let icon;
let des;
  if(Dir === "bot"){
    icon = client.emoji.gears
    des = "Bot Commands.."
  }
  if(Dir === "anime"){
    icon = client.emoji.anime
    des = "Anime Commands.."
  }
  if(Dir === "moderation"){
    icon = client.emoji.moderator
    des = "Moderation Commands.."
  }
  if(Dir === "setup"){
    icon = client.emoji.setup
    des = "Setup Commands.."
  }
  if(Dir === "ticket"){
    icon = client.emoji.ticket
    des = "ticket Commands.."
  }
  if(Dir === "custom"){
    icon = client.emoji.custom
    des = "Custom Commands.."
  }
  if(Dir === "roles"){
    icon = client.emoji.roles
    des = "Roles Commands.."
  }
  if(Dir === "owner"){
    icon = client.emoji.king
    des = "King Commands.."
  }
  if(Dir === "utility"){
    icon = client.emoji.utility
    des = "Utility Commands.."
  }
  row.components[0].options.push([
  {
    label: `${Dir.toUpperCase()}`,
    description: `${des ? des : "no description."}`,
    value: `${Dir}`,
    emoji: `${icon ? icon : client.emoji.question}`
  }
  ])
}
    
    const embed = new MessageEmbed()
    .setDescription("Which category u wanna see ?")
    .setTitle("Dream- Help Command!")
    .setColor("RANDOM")  
    .setImage(images.dance())
    .setFooter(`©${new Date(). getFullYear()} Dream.`)
    .setTimestamp()
    
    message.channel.send({embeds: [embed], components: [row]}).then(msg => {
      let collector = msg.createMessageComponentCollector({componentType: "SELECT_MENU", time: 60000})

      collector.on("collect", i => {
        
        if(i.user.id !== message.author.id) return i.reply({content: "create your own help msg *baka*", ephemeral: true})

        let dir = i.values.map(c => { return c}).join(" ")
      
        let tr = client.commands.registers.map(c => c).find(c => c.group === dir)

        let commands = client.commands.registers.filter(c => c.group === dir)

        let I = 1

        let cmds = _.chunk(commands.map((c) => {
          
          return `${I++}• ${c.name} | ${client.commands.get(c.name).description}`
        }), 10)
        
        let pages = new Pages() 
          
        for(let c of cmds){
          pages.add(
            new MessageEmbed()
            .setTitle("Dream- Help Command!")
            .setColor("RANDOM")  
            .setThumbnail(images.dance())
            .setFooter(`©${new Date(). getFullYear()} Dream.`)
            .setTimestamp()
            .setDescription(c.join("\n\n"))
          )
        }

        msg.edit({embeds: [pages.firstPage], components: [row]}).then(m => {
          pagesCollector(m, message.author, 60000, pages)
        })
      })

      collector.on("end", () => {
        msg.edit({components: []})
      })
    })
 }
   } catch (e){
     message.error("Something went wrong ;)....")
     console.log(e)
    }
  } 
} 