const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "permissionsfor",
  aliases: ["permsfor"],
  group: "utility",
  description: "show user's permissions",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["permsFor @dream"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args) => {
    try {
      let member = await client.resolvers.resolveMember({
        message: message,
        search: args.join(" ")  
      }) || message.member

      if(!member) return message.error("Mention a valid member")

      const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();

    return message.channel.send({embeds: [
      new MessageEmbed()
      .setColor(member.displayColor || 'GREY')
      .setTitle(`${member.displayName}'s Permissions`)
      .setFooter(`Permissions | \©${new Date().getFullYear()} Dream`)
      .setDescription([
        '\\🔮 - This Server',
        '\\#️⃣ - The Current Channel',
        'properties',
        '\\🔮 | \\#️⃣ | Permission',
        '===================================',
        `${Object.keys(sp).map(perm => [
          sp[perm] ? `✔ |` : `❌ |`,
          cp[perm] ? `✔ |` : `❌ |`,
          perm.split('_').map(x => `\`${x[0] + x.slice(1).toLowerCase()}\``).join(' ')
        ].join(' ')).join('\n')}`].join('\n'))
    ]});
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}