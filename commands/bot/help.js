const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const didYouMean = require("didyoumean")
const {readdirSync} = require("fs")
module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  group: "general",
  description: "Help Command!",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["help"],
  cooldown: {
    time: 5000
  },
  nsfw: false,
  run: (client, message, args) => {
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
     .addField("**__Aliases__**", cmd.aliases.length > 1 ? ">>> • " + cmd.aliases.join(" , ") : ">>> • Not Provided")
     .addField("**__Group__**", cmd.group ? ">>> • " + cmd.group : ">>> • Not Provided.")
     .addField("**__Examples__**", cmd.examples.length > 1 ? ">>> • " + cmd.examples.join("\n") : ">>> • Not Provided.")
     .addField("**__Parameters__**", cmd.parameters.length > 1 ? cmd.parameters.join("\n") : ">>> • Not Provided.")
    .addField("**__Guild Only__**", cmd.guildOnly)
     .addField("**__Admin Only__**", cmd.adminOnly)
     console.log(cmd)
     message.channel.send({embeds:[embed]})
   }else{
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
  if(Dir === "general"){
    icon = client.emoji.gears
    des = "General Commands.."
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
    .setTitle("Angel- Help Command!")
    .setColor("RANDOM")  
    .setImage(client.user.displayAvatarURL({format: "png", dynamic: true}))
    .setTimestamp()
    
    message.channel.send({embeds: [embed], components: [row]})


client.on("interactionCreate", interaction => {
  
  if(interaction.componentType === "SELECT_MENU"){
    
let dir = interaction.values.map(c => { return c}).join(" ")
      
    let tr = client.commands.registers.map(c => c).find(c => c.group === dir)

    if(tr){
 let commands = client.commands.registers.filter(c => c.group === dir)
interaction.reply({embeds: [new MessageEmbed().setTitle(dir + " Commands!").setColor("RANDOM").setThumbnail(client.user.displayAvatarURL()).setTimestamp().setDescription(`${commands.map(c => c.name).join(" • ")}`)], ephemeral: true})
}
    }
  })
    
   }
  } 
}