let types = [
  "image",
  "description",
  "thumbnail", 
  "title",
  "color"
]
module.exports = {
  name: "rr-edit-embed",
  aliases: [],
  group: "roles",
  description: "edit any self role embed sended by bot.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_SERVER"],
  examples: ["rr-edit-embed {channel} {message ID} {Type}"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let channel = await client.resolvers.resolveChannel({
        message: message,
        search: args[0],
        channelType: "GUILD_TEXT"
      })
        
     let msgId = args[1]
     let type = args[2]

      if(!channel) return message.error("Mention the channel where's the message is sent.")

      if(!msgId) return message.error("Oi! give me a valid msg id .")

      if(!type || !types.includes(type)) return  message.error("Give me Valid type.\nTypes:\n"+ types.join("\n"))

      let msg = await channel.messages.fetch(msgId)

      if(!msg.author.id === client.user.id) return message.error("I can only edit embed sent by me.")

      if(!msg.embeds[0]) return message.error("Thats not an embed. ")

      if(msg?.components[0]?.components[0].type === "SELECT_MENU"){
        if(!msg?.components[0]?.components[0].customId === "dr") return message.error("Thats not a self roles embed.")
        
      } else {
        if(!msg?.components[0]?.components[0]?.customId.startsWith("br:") ) return message.error("Thats not a self roles embed.")
      }

      if(type === "description") {
        let m = await message.channel.send("Send the description here that you want to set. \ntype cancel to cancel")

        let filter = (m) => {
     return m.member.id === message.author.id
}

        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 60000,
          errors: ['time']
        }).then(async collected => {
          let des = collected.first().content

          if(des?.toLowerCase()== "cancel"){
  return message.success("Cancelled command")
}
          await msg.edit({embeds: [{
            description: des,
            title: msg.embeds[0].title ? msg.embeds[0].title : null,
            image: {
              url: msg.embeds[0]?.image?.url
            },
            footer: {
              text: msg.embeds[0].footer.text,
              icon_url: msg.embeds[0].footer.icon_url
            },
           color: msg.embeds[0].color ? msg.embeds[0].color : null,
            thumbnail: {
              url: msg.embeds[0].thumbnail?.url
            },
            timestamp: new Date()
          }]})
          message.success("Successfully edited description of embed")
        })
      } 
      else if(type === "image") {
        let m = await message.channel.send("Send the image here that you want to set.\nType cancel to cancel. ")

        let filter = (m) => {
     return m.member.id === message.author.id
}

        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 30000,
          errors: ['time']
        }).then(async collected => {
          let image = collected.first().attachments.first()

          if(!image || !image.url) return message.error("That not a valid attachment. ")

          
          await msg.edit({embeds: [{
            description: msg.embeds[0].description ? msg.embeds[0].description: null,
            title: msg.embeds[0].title ? msg.embeds[0].title : null,
            image: {
              url: image?.url
            },
            footer: {
              text: msg.embeds[0].footer.text,
              icon_url: msg.embeds[0].footer.icon_url
            },
           color: msg.embeds[0].color ? msg.embeds[0].color : null,
            thumbnail: {
              url: msg.embeds[0].thumbnail?.url
            },
            timestamp: new Date()
          }]})
          message.success("Successfully edited image of embed")
        })
      } 
      else if(type === "title") {
        let m = await message.channel.send("Send the title here that you want to set.\ntype cancel to cancel ")

        let filter = (m) => {
     return m.member.id === message.author.id
}

        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 30000,
          errors: ['time']
        }).then(async collected => {
          let title = collected.first().content

if(title?.toLowerCase()== "cancel"){
  return message.success("Cancelled command")
}
          
          await msg.edit({embeds: [{
            description: msg.embeds[0].description ? msg.embeds[0].description : null,
            title: title ? title : msg.embeds[0].title ? msg.embeds[0].title : null,
            image: {
              url: msg.embeds[0]?.image?.url
            },
            footer: {
              text: msg.embeds[0].footer.text,
              icon_url: msg.embeds[0].footer.icon_url
            },
           color: msg.embeds[0].color ? msg.embeds[0].color : null,
            thumbnail: {
              url: msg.embeds[0].thumbnail?.url
            },
            timestamp: new Date()
          }]})
          message.success("Successfully edited title of embed")
        }) 

      } 
      else if(type === "color") {
        let m = await message.channel.send("Send the color here that you want to set. \ntype cancel to cancel")

        let filter = (m) => {
     return m.member.id === message.author.id
}

        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 30000,
          errors: ['time']
        }).then(async collected => {
          let col = collected.first().content

          if(col?.toLowerCase()== "cancel"){
  return message.success("Cancelled command")
}
          const color = col.match(/[0-9a-f]{6}/)
          if(!color) return message.error("bruh, enter a valid hex color.")
          await msg.edit({embeds: [{
            description: msg.embeds[0].description ? msg.embeds[0].description : null,
            title: msg.embeds[0].title ? msg.embeds[0].title : null,
            image: {
              url: msg.embeds[0]?.image?.url
            },
            footer: {
              text: msg.embeds[0].footer.text,
              icon_url: msg.embeds[0].footer.icon_url
            },
           color: color ? "#"+ color : msg.embeds[0].color ? msg.embeds[0].color : null,
            thumbnail: {
              url: msg.embeds[0].thumbnail?.url
            },
            timestamp: new Date()
          }]})
          message.success("Successfully edited color of embed")
        })
      } 
      else if(type === "thumbnail") {
        let m = await message.channel.send("Send the thumbnail here that you want to set. ")

        let filter = (m) => {
     return m.member.id === message.author.id
}

        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 30000,
          errors: ['time']
        }).then(async collected => {
          let image = collected.first().attachments.first()

          if(!image || !image.url) return message.error("That not a valid attachment. ")

          
          await msg.edit({embeds: [{
            description: msg.embeds[0].description ? msg.embeds[0].description: null,
            title: msg.embeds[0].title ? msg.embeds[0].title : null,
            image: {
              url: msg.embeds[0].image.url ? msg.embeds[0].image.url: null
            },
            footer: {
              text: msg.embeds[0].footer.text,
              icon_url: msg.embeds[0].footer.icon_url
            },
           color: msg.embeds[0].color ? msg.embeds[0].color : null,
            thumbnail: {
              url: image?.url
            },
            timestamp: new Date()
          }]})
          message.success("Successfully edited thumbnail of embed")
        })
      }
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}