const { MessageEmbed } = require('discord.js');
const consoleUtil = require('../../util/console.js');
const cooldowns = require('../../util/cooldowns.js');
const permissions = require('../../util/permission.js');

module.exports = class Command{
  constructor(client, command){

    /**
		 * Client that this command is for
		 * @name Command#client
		 * @type {MaiClient}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: client });

    /**
		 * Name of this command
		 * @type {string}
		 */
		this.name = command.name;

    /**
		 * Aliases for this command
		 * @type {string[]}
		 */
    this.aliases = command.aliases || [];
    if (!Array.isArray(this.aliases)){
      this.aliases = [];
    };

    /**
     * Cooldown for this command, if any exists
     * @type {Cooldown}
     */
    this.cooldown = command.cooldown || {};
    if (typeof this.cooldown !== 'object'){
      this.cooldown = {};
    } else {
      if (typeof this.cooldown.time !== 'number'){
        this.cooldown = {};
      } else if (this.cooldown < 1000){
        this.cooldown = {};
      } else {
        // Do nothing..
      };
    };

    if (typeof this.cooldown.message !== 'string'){
      this.cooldown.message = 'OH GOD.\nYou have to wait before using this command again.'
    };

    /**
     * Required Permissions by the bot instance to function properly
     * @type {Permissions[]}
     */
    if (Array.isArray(command.clientPermissions)){
      this.clientPermissions = command.clientPermissions;
    } else {
      this.clientPermissions = [];
    };

    /**
     * CRequired Permissions for the command author
     * @type {Permissions[]}
     */
    if (Array.isArray(command.permissions)){
      this.permissions = command.permissions;
    } else {
      this.permissions = [];
    };

    /**
     * Group for this command
     * @type {CommandGroup}
     */
    if (typeof command.group !== 'string'){
      this.group = 'unspecified';
    } else {
      this.group = command.group;
    };

    /**
     * The description for this command
     * @type {string}
     */
    if (typeof command.description !== 'string'){
      this.description = 'No description.';
    } else {
      this.description = command.description;
    };

    /**
     * The required parameters for this command
     * @type {string}
     */
    if (!Array.isArray(command.parameters)){
      this.parameters = [];
    } else {
      this.parameters = command.parameters
    };

    /**
     * Examples of usage for this command
     * @type {usageExamples[]}
     */
    if (!Array.isArray(command.examples)){
      this.examples = [ this.name, ...this.aliases ];
    } else {
      this.examples = command.examples;
    };

    /**
     * Whether the command can only be used on guilds and not on DMs
     * @type {Boolean}
     */
    this.guildOnly = Boolean(command.guildOnly);

    /**
     * Whether the command can only be used by the bot owner
     * @type {Boolean}
     */
    this.ownerOnly = Boolean(command.ownerOnly);

    /**
     * Whether the command can only be used by members with `ADMINISTRATOR` permissions
     * @type {Boolean}
     */
    this.adminOnly = Boolean(command.adminOnly);

    /**
     * Whether the command can only be used on nsfw channels
     * @type {Boolean}
     */
    this.nsfw = Boolean(command.nsfw);

     

    // Execute default run function if none exist on the command
    if (typeof command.run !== 'function'){
      this.run = this._run
    } else {
      this.run = command.run
    };
  };

  /**
   * Run a pseudocode for the invalidated run function.
   * @returns {void}
   */
  _run(){
    throw new Error(`Command ${this.name} doesn't have a run() method.`);
  };

  /**
   * Test permissions of this command against the message object
   * @param {Message} message The message object for this function to check with
   * @returns {PermissionGrant} The permission grant for this command when tested
   */
  testPermissions(message){
    return permissions.check(message, this);
  };

  /**
   * Test cooldowns of this command against the message object
   * @param {Message} message The message object for this function to check with
   * @returns {CooldownGrant} The cooldown grant for this command when tested
   */
  testCooldown(message){
    return cooldowns.check(message, this);
  };
   

};