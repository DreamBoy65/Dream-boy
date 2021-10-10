const Discord = require('discord.js');
const chalk = require('chalk');

function setup(options) {
	this.options = options || {};

	if (!this.options.client) {
		throw new Error(chalk.red('[wlcm-bot] client is not provided'));
	}

	this.options.client.on('messageCreate', async message => {
		if (this.options.commands) {
			if (!this.options.prefix) {
				throw new Error(
					chalk.red(
						'[wlcm-bot] commands will not work bcz prefix is not defined!'
					)
				);
			}

			this.options.commands.map(c => {
				if (c.name && !c.reply) {
					throw new Error(
						chalk.red('[wlcm-bot] ' + c.name + "'s reply is not defined!")
					);
				}
				if (!c.name && c.reply) {
					throw new Error(
						chalk.red('[wlcm-bot] ' + c.reply + "'s name is not defined!")
					);
				}
				if (message.content === this.options.prefix + c.name) {
					if (c.type === 'reply') {
						message.reply(c.reply);
					} else {
						message.channel.send(c.reply);
					}
				}
			});
		}

		if (this.options.triggers) {
			this.options.triggers.map(t => {
				if (t.name && !t.answer) {
					throw new Error(
						chalk.red('[wlcm-bot] ' + t.name + "'s answer is not provided!")
					);
				}
				if (!t.name && t.answer) {
					throw new Error(
						chalk.red('[wlcm-bot] ' + t.answer + "'s name is not provided!")
					);
				}
				if (message.content === t.name) {
					if (t.type === 'reply') {
						message.reply(t.answer);
					} else {
						message.channel.send(t.answer);
					}
				}
			});
		}
	});

	this.options.client.on('guildMemberAdd', async member => {
		if (this.options.wlcm_channel) {
			if (!this.options.wlcm_embedType) {
				member.guild.channels.cache
					.get(this.options.wlcm_channel)
					.send(await modify(this.options.wlcm_msg, member));
			} else {
				member.guild.channels.cache.get(this.options.wlcm_channel).send({
					embed: {
						description: await modify(
							this.options.wlcm_embed.description,
							member
						),
						image: {
							url: await modify(this.options.wlcm_embed.image.url, member)
						},
						title: await modify(this.options.wlcm_embed.title, member),
						color: this.options.wlcm_embed.color || '#ffffff',
						fields: this.options.wlcm_embed.fields,
						author: {
							name: await modify(this.options.wlcm_embed.author.name, member),
							icon_url: await modify(
								this.options.wlcm_embed.author.icon_url,
								member
							)
						},
						footer: {
							text: await modify(this.options.wlcm_embed.footer.text, member),

							icon_url: await modify(
								this.options.wlcm_embed.footer.icon_url,
								member
							)
						},
						thumbnail: {
							url: await modify(this.options.wlcm_embed.thumbnail.url, member)
						}
					}
				});
			}
		}
	});
  this.options.client.on("guildMemberRemove", async member => {
    if (this.options.leave_channel) {
			if (!this.options.leave_embedType) {
				member.guild.channels.cache
					.get(this.options.leave_channel)
					.send(await modify(this.options.leave_msg, member));
			} else {
				member.guild.channels.cache.get(this.options.leave_channel).send({
					embed: {
						description: await modify(
							this.options.leave_embed.description,
							member
						),
						image: {
							url: await modify(this.options.leave_embed.image.url, member)
						},
						title: await modify(this.options.leave_embed.title, member),
						color: this.options.leave_embed.color || '#ffffff',
						fields: this.options.leave_embed.fields,
						author: {
							name: await modify(this.options.leave_embed.author.name, member),
							icon_url: await modify(
								this.options.leave_embed.author.icon_url,
								member
							)
						},
						footer: {
							text: await modify(this.options.leave_embed.footer.text, member),

							icon_url: await modify(
								this.options.leave_embed.footer.icon_url,
								member
							)
						},
						thumbnail: {
							url: await modify(this.options.leave_embed.thumbnail.url, member)
						}
					}
				});
			}
		}
  })
}

async function modify(str, member){
  const owner = await member.guild.members.fetch(member.guild.ownerID);
  const modifiers = {
    "{avatar}": member.user.displayAvatarURL(),
    "{avatarDynamic}": member.user.displayAvatarURL({ dynamic: true, format: 'png'}),
    "{channelCount}": member.guild.channels.cache.size,
    "{categoryChannelCount}": member.guild.channels.cache.filter( c => c.type === 'category').size,
    "{textChannelCount}": member.guild.channels.cache.filter( c => c.type === 'text').size,
    "{voiceChannelCount}": member.guild.channels.cache.filter( c => c.type === 'voice').size,
    "{createdAt}": member.user.createdAt,
    "{createdAtMDY}": moment(member.user.createdAt).format('dddd, MMMM D YYYY'),
    "{discriminator}": member.user.discriminator,
    "{displayColor}": member.displayColor,
    "{displayName}": member.displayName,
    "{guildIcon}": member.guild.iconURL(),
    "{guildIconDynamic}": member.guild.iconURL({dynamic: true, format: 'png'}),
    "{guildName}": member.guild.name,
    "{guildOwner}":  owner.user.username,
    "{guildOwnerNickname}": owner.displayName,
    "{guildOwnerTag}": owner.user.tag,
    "{guildOwnerDiscrim}": owner.user.discriminator,
    "{guildOwnerAvatar}": owner.user.displayAvatarURL(),
    "{guildOwnerAvatarDynamic}": owner.user.displayAvatarURL({dynamic: true, format: 'png'}),
    "{joinedAt}": member.joinedAt,
    "{joinedAtMDY}": moment(member.joinedAt).format('dddd, MMMM D YYYY'),
    "{memberCount}": member.guild.memberCount,
    "{tag}": member.user.tag,
    "{user}": member.user.username,
    "{userNickname}": member.displayName,
    "{userTag}": member.user.tag,
    "{userDiscrim}": member.user.discriminator,
    "{userAvatar}": member.user.displayAvatarURL(),
    "{userAvatarDynamic}": member.user.displayAvatarURL({ dynamic: true, format: 'png'}),
    "{usermention}": member.toString(),
    "{memberJoinRank}": member.guild.memberCount,
    "{memberJoinRankOrdinalized}": text.ordinalize(member.guild.memberCount)
  };
  const regexp = new RegExp(Object.keys(modifiers).join('|'), 'g');

  return str.replace(regexp, word => {
    return modifiers[word] || word;
  });
};


const list = new Intl.ListFormat('en');

function textTruncate(str = '', length = 100, end = '...'){
  return String(str).substring(0, length - end.length) + (str.length > length ? end : '');
};

function truncate(...options){
  return textTruncate(...options);
};

function ordinalize(n = 0){
  return Number(n)+[,'st','nd','rd'][n/10%10^1&&n%10]||Number(n)+'th';
};

function commatize(number, maximumFractionDigits = 2){
  return Number(number || '')
  .toLocaleString('en-US', { maximumFractionDigits });
};

function compactNum(number, maximumFractionDigits = 2){
  return Number(number || '')
  .toLocaleString('en-US', {
    notation: 'compact', maximumFractionDigits
  });
};

module.exports.setup = setup;
