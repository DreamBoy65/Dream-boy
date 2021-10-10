module.exports = class GuildProfile {
  constructor(data){
    
    this.id = data._id;

    this.prefix = data.prefix || null;

    this.ticket = {
      channel: data.tickets.channel,
      category: data.tickets.category,
      uses: data.tickets.uses,
      message: data.tickets.message
    }
  }
}