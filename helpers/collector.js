const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js")
const emoji = require("../config/emojis")
module.exports = {
  pagesCollector: async function(msg, author, time, pages){
    if(!author) return;
    if(!time) time = 5000;
    if(!pages) return;
    let id;

    if(msg?.deleted) return;

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

    let row = new MessageActionRow().addComponents(button1, button2)

    let Row;
    
    if(msg.components[0]){
      Row = new MessageActionRow().addComponents(msg.components[0].components)
    } else {
      row = new MessageActionRow().addComponents(button1, button2)
    }

    await msg.edit({embeds: [pages.firstPage], components: Row ? [Row, row] : [row]})
    
    let filter = m => m.user.id === author.id

    let collector = msg?.createMessageComponentCollector({ filter, time: time });

    collector.on("collect", i => {

      if(i.message.deleted) return collector.stop()
       
      let id = i.customId
      
      if(id === "next"){
      msg?.edit({embeds: [pages.next()]})
      }

      if(id === "back"){
      msg?.edit({embeds: [pages.previous()]})
      }
    })

    collector.on("end", () => {
      
      if(msg.deleted) return;
      
      msg?.edit({components: []})
    })
 },
  verify: async function(msg, author, time){
    if(!author) return;
    if(!time) time = 5000;

    let button1 = new MessageButton()
    .setCustomId('YES')
	  .setLabel('Yes')
	  .setStyle('SUCCESS')
	  .setEmoji(emoji.yes);

    let button2 = new MessageButton()
    .setCustomId('NO')
	  .setLabel('No')
	  .setStyle("DANGER")
	  .setEmoji(emoji.no);

    let row = new MessageActionRow()
    .addComponents(button1, button2)

    msg.edit({components: [row]})

    let filter = i => i.user.id === author.id 

    return await msg.awaitMessageComponent({filter, componentType: "BUTTON", max: 1, time: time}).then(c => {
      return c.customId
    }).catch(e => {
      msg.edit({embeds: [{
        title: "TimeOut-",
        color: "RANDOM"
      }]})
    })
  }
}