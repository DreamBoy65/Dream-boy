const Schema = require(`${process.cwd()}/models/GuildProfile`)

module.exports = async(client, message) => {

  if(!message.guild) return;

  let data = await Schema.findOne({_id: message.guildId})

  if(!data || !data.logs.log) return;

  let channel = client.guilds.cache.get(message.guildId).channels.cache.get(data.logs.log)

  const entry = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" }).then(audit => audit.entries.first())

  if(!channel) return;

  channel.send({embeds: [{
    title: "Guild Logs",
    description: "Message Deleted!",
    timestamp: new Date(),
    footer: {
      text: `\©${new Date().getFullYear()} Dream`
    },
    color: "RANDOM", 
    thumbnail: {
      url: entry?.executor.displayAvatarURL()
    },
    fields: [
      {
        name: `${client.emoji.user} | User:`,
        value: `>>> ${entry?.target.username}#${entry?.target.discriminator} | \`${entry?.target.id}\``
      },
      {
        name: `${client.emoji.moderator} | Moderator:`,
        value: `>>> ${entry?.executor.username}#${entry?.executor.discriminator} | \`${entry?.executor.id}\``
      },
      {
        name: `${client.emoji.channel} | Channel:`,
        value: `>>> ${client.channels.cache.get(entry?.extra.channel.id)}`
      },
      {
        name: `✉ | Content:`,
        value: `>>> ${message.content}`
      }
    ]
  }]})

}