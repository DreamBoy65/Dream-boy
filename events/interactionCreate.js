const { handleTicketSystem } = require("../util/ticketHandler")

const {handleBr} = require("../util/brHandler")
module.exports = async(client, interaction) => {
  //Ticket system
  await handleTicketSystem(client, interaction)
  //Button Roles
  await handleBr(client, interaction)
}