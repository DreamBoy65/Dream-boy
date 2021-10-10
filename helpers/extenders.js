const {MessageEmbed, Message} = require("discord.js")
const emoji = require("../config/emojis")

  Message.prototype.sendE = function(string, options = {}){
    const embed = new MessageEmbed()
    .setAuthor(this.author.username, this.author.displayAvatarURL())
    .setDescription(string)
    .setColor("RANDOM")
       .setFooter(`\©${new Date().getFullYear()} Dream`)
    .setTimestamp()
    
    if(options.title){
      embed.setTitle(options.title)
    }
    if(options.edit){
      this.edit({embeds: [embed]})
    }else{
      this.channel.send({embeds: [embed]})
    }
  }



Message.prototype.error = function(string){
this.reply({embeds: [new MessageEmbed(). setAuthor(this.author.username, this.author.displayAvatarURL()).setDescription(`${emoji.error}` + " | " + string).setColor("RED").setFooter(`\©${new Date().getFullYear()} Dream`)
    .setTimestamp()]})
}

Message.prototype.success = function(string){
  this.reply({embeds: [
    new MessageEmbed()
  .setAuthor(this.author.username, this.author.displayAvatarURL())
  .setDescription(`${emoji.success} | ${string}`)
    .setColor("GREEN")
    .setFooter(`\©${new Date().getFullYear()} Dream`)
    .setTimestamp()
  ]})
}

Message.prototype.load = async function(string, options = {}){
  
  this.reply({embeds: [
    new MessageEmbed()
  .setAuthor(this.author.username, this.author.displayAvatarURL())
  .setDescription(`${emoji.load} | ${string}`)
    .setColor("GREEN")
  ]}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, options.timeOut ? options.timeOut : 5000)
  })
}