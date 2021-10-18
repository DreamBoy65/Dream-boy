module.exports = async (client, message) => {

  
  if (message.author.bot){
    return;
  };

  const serverprefix = client.guildProfiles?.get(message.guild?.id)?.prefix || 'Not set'

  

  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
    return message.channel.send(`${message.author}, My prefix is \`${client.config.prefix}\`, The custom prefix is \`${serverprefix}\`.`)
  }
  const { executed, reason } = await client.commands.handle(message);

return 
}
