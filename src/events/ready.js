// src/events/ready.js

/**
 * @module ReadyEvent
 * @description This module exports the ready event for a Discord bot, which logs a message when the bot is ready.
 */
module.exports = {
	// Event name
	name: 'ready',

	// Indicates that this event should only be triggered once
	once: true,

	/**
	 * Execute function to handle the event
	 * @param {Client} client - The Discord client instance
	 */
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
}
