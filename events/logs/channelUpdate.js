const Schema = require(`${process.cwd()}/models/GuildProfile`)

module.exports = async(client, channel) => {

  if(!channel.guild) return;

  let data = await Schema.findOne({_id: channel.guildId})

  if(!data || !data.logs.log) return;

  let ch = client.guilds.cache.get(channel.guildId).channels.cache.get(data.logs.log)

  const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_UPDATE" }).then(audit => audit.entries.first())

  if(!ch) return;

  ch.send({embeds: [{
    title: "Guild Logs",
    description: "Channel Updated!",
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
        name: `${client.emoji.moderator} | Moderator:`,
        value: `>>> ${entry?.executor.username}#${entry?.executor.discriminator} | \`${entry?.executor.id}\``
      },
      {
        name: `${client.emoji.channel} | Channel:`,
        value: `>>> ${channel} | \`${channel.id}\``
      },
      {
        name: `${client.emoji.question} | Type:`,
        value: `>>> ${entry?.target.type}`
      },
      {
        name: `${client.emoji.updates} | Updates:`,
        value: `>>> ${entry?.changes.map((c, i) => `${i+1}:\nKey: ${c.key}\nOld Change: ${c.old}\nNew Change: ${c.new}`).join("\n\n")}`
      }
    ]
  }]})

}