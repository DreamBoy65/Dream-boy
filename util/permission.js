const { MessageEmbed } = require('discord.js');

function check(message, command){
  const reasons = [];
  

  if (command.guildOnly){
    if (message.channel.type === 'dm'){
      reasons.push([
        '**Command is unavailable on DM**',
        'This command can only be used inside servers.'
      ].join(' - '));
    } else {
      // Do nothing..
    };
  }

  if (message.channel.type !== 'dm'){
    if (command.ownerOnly){
      if (!message.client.owners.includes(message.author.id)){
        reasons.push([
          '**Limited to Devs**',
          'This command can only be used by my developers.'
        ].join(' - '));
      } else {
        // Do nothing..
      };
};
    if (command.adminOnly){
      if (!message.member.hasPermission('ADMINISTRATOR')){
        reasons.push([
          '**Limited to Admins**',
          'This command can only be used by server administrators.'
        ].join(' - '))
      } else {
        // Do nothing..
      };
    };
    if (Array.isArray(command.permissions)){
      if (!message.channel.permissionsFor(message.member).has(command.permissions)){
        reasons.push([
          '**No Necessary Permissions (User)** - ',
          'You need the following permission(s):\n\u2000\u2000- ',
          Object.entries(message.channel.permissionsFor(message.member).serialize())
          .filter( p => command.ermissions.includes(p[0]) && !p[1])
          .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
          .join('\n\u2000\u2000- ')
        ].join(''))
      } else {
        // Do nothing..
      };
    };
    if (Array.isArray(command.clientPermissions)){
      if (!message.channel.permissionsFor(message.guild.me).has(command.clientPermissions)){
        reasons.push([
          '**Oh My Lord!\nI dont have enough Permission(s) to work.** - \n',
          'I need the following permission(s):\n\u2000\u2000- ',
          Object.entries(message.channel.permissionsFor(message.guild.me).serialize())
          .filter(p => command.clientPermissions.includes(p[0]) && !p[1])
          .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
          .join('\n\u2000\u2000- ')
        ].join(''))
      } else {
        // Do nothing..
      };
    };
    

  if (command.nsfw) {
    if (!message.channel.nsfw){
      reasons.push([
        '**NSFW Command**',
        'You can only use this command on a nsfw channel.'
      ].join(' - '))
    };
  };

  

  const embed = new MessageEmbed()
  .setAuthor('Command Execution Blocked!')
  .setColor('ORANGE')
  .setDescription(`Reasons:\n\n${reasons.map(reason => '• ' + reason).join('\n')}`);

  return { accept: !reasons.length, embed }
}
}
module.exports = { check };