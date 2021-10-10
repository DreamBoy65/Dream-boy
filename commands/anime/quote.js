const { MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const { randomQuote, getQuotesByCharacter, getQuotesByAnime } = require('animequotes');
const { searchAnime } = require('node-kitsu');
const fetch = require("node-fetch")
module.exports = {
  name: "aniquote",
  aliases: [ 'aq', 'animequote' ],
  group: 'anime',
  clientPermissions: [ 'EMBED_LINKS' ],
  description: 'Generate a random anime quote. or quote by anime',
  parameters: [],
  examples: [ 'aniquote', 'aq', 'animequote', "aq death note"],
  run: async ( client, message, args) => {
   try {
     let arg = args.join(" ")
    const row = new MessageActionRow()
      .addComponents(new MessageButton()
      .setCustomId('refresh')
	    .setStyle('PRIMARY')
	    .setEmoji('🔄'))


      let msg

    if(!arg) {
msg = await message.channel.send({embeds: [await random()], components: [row]})
} else {
       msg = await message.channel.send({embeds: [await Quote(arg)], components: [row]})
}

    
        let filter = m => m.user.id === message.author.id

    let collector = msg.createMessageComponentCollector({ filter, time: 90000 });

    collector.on("collect", async i => {
       
      let id = i.customId
      
      if(id === "refresh"){
      if(!arg){
        msg.edit({embeds: [await random()]})
      } else {
        msg.edit({embeds: [await Quote(arg)]})
      }
      }
    })

    collector.on("end", () => {
    msg.edit({components: []})
    })
      
                    
   } catch (e) {
message.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
}
                                                                                
   }                                                           
};

async function random(){

  const { quote, anime, id, name } = randomQuote();
  
    const res = await searchAnime(anime,0).catch(()=>{}) || [];

    const image = res?.[0]?.attributes?.coverImage?.original || null;

    
      const embed = new MessageEmbed()
      .setColor(`GREY`)
      .addField(`*Quoted from ${anime}*`,`${quote}\n\n-*${name}*`)
      .setImage(image)
      .setTimestamp()
      .setFooter(`Anime Quotes | \©️${new Date().getFullYear()} Dream`)

  return embed
}

async function Quote(args) {
    const Data = await fetch(
				'https://animechan.vercel.app/api/quotes/anime?title=' + args
			).then(response => response.json());


  if(Data.error) return new MessageEmbed().setTitle("No results found.")

let data = Data[Math.floor(Math.random() * Data.length)]
  
const res = await searchAnime(data.anime,0).catch(()=>{}) || [];

    const image = res?.[0]?.attributes?.coverImage?.original || null;
  
  const embed = new MessageEmbed()
      .setColor(`GREY`)
      .addField(`*Quoted from ${data.anime}*`,`${data.quote}\n\n-*${data.character}*`)
      .setImage(image)
      .setTimestamp()
      .setFooter(`Anime Quotes | \©️${new Date().getFullYear()} Dream`)

  return embed

}