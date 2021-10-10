const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js")
const emoji = require("../config/emojis")
module.exports = {
  pagesCollector: async function(msg, author, time, pages){
    if(!author) return;
    if(!time) time = 5000;
    if(!pages) return;
    let id;

    if(pages.size === 1) {
      return;
    }

    let button1 = new MessageButton()
    .setCustomId('back')
	  .setLabel('Back')
	  .setStyle('PRIMARY')
	  .setEmoji(emoji.back);

    let button2 = new MessageButton()
    .setCustomId('next')
	  .setLabel('Next')
	  .setStyle('PRIMARY')
	  .setEmoji(emoji.next);

    let row = new MessageActionRow()
    .addComponents(button1, button2)

    msg.edit({embeds: [pages.firstPage], components: [row]})
    
    
    let filter = m => m.user.id === author.id

    let collector = msg.createMessageComponentCollector({ filter, time: time });

    collector.on("collect", i => {
       
      let id = i.customId
      
      if(id === "next"){
      msg.edit({embeds: [pages.next()]})
      }

      if(id === "back"){
      msg.edit({embeds: [pages.previous()]})
      }
    })

    collector.on("end", () => {
    msg.edit({components: []})
    })
 }
}