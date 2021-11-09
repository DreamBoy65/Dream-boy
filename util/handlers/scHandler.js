const Schema = require("../../models/GuildProfile")

module.exports = {
  handleSc: async function(client, interaction) {

    let data = await Schema.findOne({_id: interaction.guildId})

    if(!data) return;

    let res = data.custom.slash.find(c => c.trigger === interaction.commandName)

    if(res) return interaction.reply(res.res)
  }
}