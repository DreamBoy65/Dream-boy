const Discord = require('discord.js');

const client = new Discord.Client();

const { setup } = require("./index")

setup({
	client: client,
	prefix: '!!',
	commands: [
		{
			name: 'hlo',
			reply: 'Hloooooo!',
			type: 'reply'
		},
		{
			name: 'boo',
			reply: 'booo!'
		}
	],
	triggers: [
		{
			name: 'hlo',
			answer: 'Hloooo',
			type: 'reply'
		}
	],
	wlcm_channel: '863395716318625822',
	leaveChannel: '',
	wlcm_embedType: true,
	wlcm_embed: {
		color: 0x0099ff,
		title: 'Welcome!',
		url: '',
		author: {
			name: 'Welcome to {guildName}',
			icon_url: "{avatarDynamic}"
		},
		description: '{user}',
		thumbnail: {
			url: '{avatarDynamic}'
		},
		image: {
			url: '{avatarDynamic}'
		},
		timestamp: new Date(),
		footer: {
			text: 'welcome {user}',
			icon_url: "{guildIcon}"
		}
	},
	wlcm_msg: 'Hlo {user}',
	leave_embedType: true,
	leave_embed: {
		title: 'byeeee {username}'
	},
	leave_msg: 'byeeeee {username}'
});
client.on('ready', () => {
	console.log('hlo ' + client.user.username);
});

client.login('ODI0NDQ0NjcyMTYzNTc3ODc2.YFvd7w.kwXXVazxyrpfWDGK5Hmc5VjeTnI ');
