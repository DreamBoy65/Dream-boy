const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'jumbo',
  aliases: [],
  group: 'utility',
  desciption: 'Display the larger version of the supplied emoji',
  parameters: [ 'emoji' ],
  examples: [
    'emoji :exampleonly:'
  ],
  guildOnly: false,
  run: (cient, message, args) => {

let emoji = args.join(" ")

    if (!emoji.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)){
      return message.error(`please enter a valid custom emoji!`);
    };

    const button = new MessageButton()
        .setLabel("Link")
        .setStyle("LINK") 
        .setURL('https://cdn.discordapp.com/emojis/' + emoji.match(/\d{17,19}/)[0])

    const row = new MessageActionRow().addComponents(button)    
      return message.channel.send({embeds: [
      new MessageEmbed()
      .setColor('RANDOM')
      .setImage('https://cdn.discordapp.com/emojis/' + emoji.match(/\d{17,19}/)[0])
      .setFooter(`Emoji: ${emoji.match(/\w{2,32}/)[0]} | \©${new Date().getFullYear()} Dream `)
    ], components: [row]});
  }
};