// src/commands/ping.js

const { SlashCommandBuilder } = require('discord.js');

/**
 * @module PingCommand
 * @description This module exports the ping command for a Discord bot, which displays the bot's current ping.
 */
module.exports = {
	// Define the command data using the SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Displays the bot\'s ping'),

	/**
	 * Execute function to handle the interaction
	 * @param {object} interaction - The interaction object from Discord.js
	 * @returns {Promise<void>}
	 */
	async execute(interaction) {
		// Defer the reply without sending a message
		const sent = await interaction.deferReply({ fetchReply: true });
		
		// Calculate the ping by measuring the time taken to defer and edit the reply
		const ping = sent.createdTimestamp - interaction.createdTimestamp;
		
		// Edit the reply to display the calculated ping
		await interaction.editReply(`The bot's ping is ${ping} ms.`);
	},
};
