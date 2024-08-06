// src/commands/clear.js

const { SlashCommandBuilder } = require('discord.js');

/**
 * @module ClearCommand
 * @description This module exports the clear command for a Discord bot, which deletes a specified number of messages from the channel.
 */
module.exports = {
	// Define the command data using the SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Deletes a specified number of messages from the channel')
		.addIntegerOption(option => 
			option.setName('amount')
				.setDescription('The number of messages to delete')
				.setRequired(true)
		),

	/**
	 * Execute function to handle the interaction
	 * @param {object} interaction - The interaction object from Discord.js
	 * @returns {Promise<void>}
	 */
	async execute(interaction) {
		// Fetch the 'amount' option from the interaction
		const amount = interaction.options.getInteger('amount');

		if (amount < 1 || amount > 100) {
			return interaction.reply({ content: 'Please enter a number between 1 and 100.', ephemeral: true });
		}

		// Attempt to bulk delete the specified amount of messages
		await interaction.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			interaction.reply({ content: 'There was an error trying to delete messages in this channel!', ephemeral: true });
		});

		// Reply to the interaction confirming the deletion
		return interaction.reply({ content: `Successfully deleted ${amount} messages.`, ephemeral: true });
	},
};
