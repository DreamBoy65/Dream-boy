module.exports = {
  name: "rc-create",
  aliases: [],
  group: "custom",
  description: "create custom response commands. ",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["rc-create hello hi"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
      let trigger = args[0]
      let res = args.slice(1).join(" ")

      if(!trigger) return message.error("*sir* i want trigger of the command. ")

      if(!res) return message.error("Where is the response...????")

      if(data.custom.response.find(c => c.trigger === trigger)) return message.error("Command with that trigger is already exists.")

      data.custom.response.push({
        trigger: trigger,
        res: res
      })

      await data.save()

      message.success("Command successfully submitted..")
    
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}