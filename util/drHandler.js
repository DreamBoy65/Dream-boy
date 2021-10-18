module.exports = {
  handleDr: async function(client, interaction){
    if(interaction.isSelectMenu()){
      let member;
		const fetchMem = await interaction.guild.members.fetch(interaction.member.id, false);
		if (fetchMem) member = interaction.guild.members.cache.get(interaction.member.id);
		await member.fetch(true);

      if(interaction.customId !== "dr") return;

    let role = interaction.values[0]

      if (interaction.member.roles.cache.has(role)) {
      let msg = await interaction.reply({content: `Removed <@&${role}> from you.`, ephemeral: true})
			interaction.member.roles.remove(role);
		}
		else {
			let msg = await interaction.reply({content: `Added <@&${role}> to you.`, ephemeral: true});
      interaction.member.roles.add(role)
		  }
    }
  }
}