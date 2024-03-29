const { duration } = require('moment');
const ms = require("ms")
const Schema = require("../../models/GuildProfile")
async function CommandHandler(manager, message){

  if (message.guild){
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
      return { executed: false, reason: 'PERMISSION_SEND'};
    } else {
      // Do nothing..
    };
  };
  
  let data;

  if(message.guild){
    data = await Schema.findOne({_id: message.guild?.id})
  if(!data){
   let Data = new Schema({_id: message.guild?.id})
    await Data.save()
    data = await Schema.findOne({_id: message.guild?.id})
}
  }

  let serverprefix = data?.prefix

  let reso = data?.custom.response.find(c => c.trigger === message.content)

  if(reso) {
    message.reply(reso.res)
  }
    
  let prefix;

  if (message.content.startsWith('dream')){
    prefix = 'dream'
  } else if (message.content.startsWith(message.client.config.prefix)){
    prefix = message.client.config.prefix;
  } else if (serverprefix && message.content.startsWith(serverprefix)){
    prefix = serverprefix;
  };

  if (!prefix){
    return { executed: false, reason: 'PREFIX'};
  };

  const args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
	
  let name = args.shift().toLowerCase()
  
  const command = manager.get(name);

  let res = data?.custom.commands.find(c => c.trigger === name)

  if(res) {
    message.reply(res.res)
  }

  if (!command){
    return { executed: false, reason: 'NOT_FOUND' };
  };

  const { accept: permission_granted, terminate, embed } = command.testPermissions(message);

  if (terminate){
    return { executed: false, reason: 'TERMINATED' };
  };

  if (!permission_granted){
    if (message.guild){
      message.channel.send(
        message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')
        ? {embeds: [embed]} : embed.description
      );
    } else {
      message.channel.send({embeds: [embed]});
    };
    return { executed: false, reason: 'PERMISSION' };
  
  };
  
  const { accept: cooldown_accepted, timeLeft } = command.testCooldown(message, command);

  if (!cooldown_accepted){
     message.channel.send([
      `<:Cancel_256x256:884424442233634816>\u2000\u2000|\u2000\u2000${message.author}`,
      `${command.cooldown.message || "Slowdown on the name of GOD!"}\n⏳\u2000\u2000|\u2000\u2000Time left:`,
      ms(timeLeft)
    ].join(' '))

    return { executed: false, reason: 'COOLDOWN' };
  } else {
    command.run(message.client, message, args, data);
  };

  return { executed: true };
}

module.exports = CommandHandler;