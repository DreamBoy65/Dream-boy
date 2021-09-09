module.exports = class GuildProfile{
  constructor(data){
    
    this.id = data._id;

    this.prefix = data.prefix || null;
  }
}