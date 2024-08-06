// src/commands/clearall.js

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

/**
 * @module ClearAllCommand
 * @description This module exports the clearAll command for a Discord bot, which deletes all messages from the channel.
 */
module.exports = {
	// Define the command data using the SlashCommandBuilder
	data: new SlashCommandBuilder()
		.setName('clearall')
		.setDescription('Deletes all messages from the channel'),

	/**
	 * Execute function to handle the interaction
	 * @param {object} interaction - The interaction object from Discord.js
	 * @returns {Promise<void>}
	 */
	async execute(interaction) {
		// Create buttons for confirmation
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('confirm')
					.setLabel('Accept')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('cancel')
					.setLabel('Decline')
					.setStyle(ButtonStyle.Secondary)
			);

		// Send confirmation message with buttons
		await interaction.reply({
			content: 'Are you sure you want to delete all messages in this channel?',
			components: [row],
			ephemeral: true
		});

		// Create a filter to only accept button interactions from the user who initiated the command
		const filter = i => {
			i.deferUpdate();
			return i.user.id === interaction.user.id;
		};

		// Await button interaction
		try {
			const response = await interaction.channel.awaitMessageComponent({ filter, time: 15000 });

			if (response.customId === 'confirm') {
				// User confirmed the action
				let fetched;

				do {
					fetched = await interaction.channel.messages.fetch({ limit: 100 });

					const messagesToDelete = fetched.filter(msg => !msg.pinned); // Exclude pinned messages

					await interaction.channel.bulkDelete(messagesToDelete, true);
				} while (fetched.size >= 2); // Continue until less than 2 messages are fetched (one might be the bot's deferred reply)

				await interaction.followUp({ content: 'Successfully deleted all messages.', ephemeral: true });
			} 
			else {
				// User cancelled the action
				await interaction.followUp({ content: 'Action cancelled.', ephemeral: true });
			}
		} 
		catch (err) {
			// Handle timeout or other errors
			await interaction.followUp({ content: 'No response received. Action cancelled.', ephemeral: true });
		}
	},
};
