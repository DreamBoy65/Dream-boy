let Schema = require("../../models/GuildProfile")
  
module.exports = async (client, message) => {

  
  if (message.author.bot){
    return;
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
  

  const serverprefix = data?.prefix || "Not set."
  

  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
    return message.channel.send(`${message.author}, My prefix is \`${client.config.prefix}\`, The custom prefix is \`${serverprefix}\`.`)
  }
  const { executed, reason } = await client.commands.handle(message);

return 
}
