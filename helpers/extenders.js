const {MessageEmbed, Message} = require("discord.js")
const emoji = require("../config/emojis")

  Message.prototype.sendE = function(string, options = {}){
    const embed = new MessageEmbed()
    .setAuthor(this.author.username, this.author.displayAvatarURL())
    .setDescription(string)
    .setColor("RANDOM")
       .setFooter(`${this.client.user.username}`, this.client.user.displayAvatarURL() )
    
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
this.channel.send({embeds: [new MessageEmbed().setAuthor(this.author.username, this.author.displayAvatarURL()).setDescription(`${emoji.error}` + " | " + string)]})
}