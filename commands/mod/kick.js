const { verify } = require("../../helpers/collector")

module.exports = {
  name: "kick",
  aliases: [],
  group: "moderation",
  description: "kick someone out of the server. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["KICK_MEMBERS"],
  examples: ["kick dream"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let member = await client.resolvers.resolveMember({
        message,
        search: args[0]
      })

      if(!member) return message.error("Heyy! you didn't mentioned anyone soo-- can i kick ya?")

      if(member.user.id === message.author.id) return message.error("Ok Ok. wait I'll complain about you to owner-")

      if(!member.kickable) return message.error("You can't kick them dumbo-")

      await message.channel.send({embeds: [{
        title: "Would you really like to kick them?",
        color: "RANDOM",
        fields: [
              {
                name: `${client.emoji.user} | User:`,
                value: member.user.tag
              },
              {
                name: `${client.emoji.moderator} | Moderator:`,
                value: message.author.tag
              },
              {
                name: "Reason:",
                value: `${args.slice(1)?.join(" ") || "NoNe"}`
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `\©${new Date().getFullYear()} Dream`
            }
        
      }]}).then(async msg => {
        await verify(msg, message.author, 10000).then(async c => {

          if(c === "YES"){

            member.send("Heyyyyyy! you have been kicked out from the guild. \nReason: " + args.slice(1)?.join(" ")).catch(e => console.log)
      
     await member.kick({reason: args.slice(1)?.join(" ")})
            
      msg.delete()
            
      message.success("User Kicked *get los*\nReason: " + args.slice(1)?.join(" ") || "NoNe")

            if(data.logs?.dream){
        let channel = message.guild.channels.cache.get(data.logs.dream)

        if(channel){
          channel.send({embeds: [{
            title: "Guild Logs",
            description: "User Kicked.",
            fields: [
              {
                name: `${client.emoji.crime} | Case:`,
                value: `>>> ${data.logs.case + 1}`
              },
              {
                name: `${client.emoji.user} | User:`,
                value: ">>> " + member.user.tag
              },
              {
                name: `${client.emoji.moderator} | Moderator:`,
                value: ">>> " + message.author.tag
              },
              {
                name: "Reason:",
                value: `${args.slice(1)?.join(" ") || "NoNe"}`
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `\©${new Date().getFullYear()} Dream`
            },
             color: "RANDOM", 
             thumbnail: {
               url: member.user.displayAvatarURL()
             }
        }]})
        }
      }
          } else {
            msg.delete()
          }
        })
      })
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}