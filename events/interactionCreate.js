const { handleTicketSystem } = require("../util/ticketHandler")

const {handleBr} = require("../util/brHandler")

const { handleDr } = require("../util/drHandler")

module.exports = async(client, interaction) => {

  if(!interaction.guild.id) return;
  
  //Ticket system
  await handleTicketSystem(client, interaction)
  //Button Roles
  await handleBr(client, interaction)
  //DropDown Roles
  await handleDr(client, interaction)
}