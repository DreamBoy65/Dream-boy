const { handleTicketSystem } = require("../../util/handlers/ticketHandler")

const { handleBr } = require("../../util/handlers/brHandler")

const { handleDr } = require("../../util/handlers/drHandler")

const { handleSuggestions } = require("../../util/handlers/suggestionHandler")

const { handleSc } = require("../../util/handlers/scHandler")

module.exports = async(client, interaction) => {

  if(!interaction.guild.id) return;
  if(interaction.user.bot) return;
  
  //Ticket system
  await handleTicketSystem(client, interaction)
  //Button Roles
  await handleBr(client, interaction)
  //DropDown Roles
  await handleDr(client, interaction)
  //Suggestion system
  await handleSuggestions(client, interaction)
  //Custom slash cmd
  await handleSc(client, interaction)
}