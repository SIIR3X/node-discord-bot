// src/index.js

// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Destructure variables from process.env
const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Initialize collections to store commands and events
client.commands = new Collection();

// Load command files from the commands directory
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// Ensure the command has the required properties
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} 
	else {
		console.log(`[WARNING] The command at ./commands/${file} is missing a required "data" or "execute" property.`);
	}
}

// Load event files from the events directory
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Register commands with Discord's API
const commands = client.commands.map(command => command.data.toJSON());
const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} 
	catch (error) {
		console.error(error);
	}
})();

// Event listener for interactions (commands)
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} 
	catch (error) {
		console.error(error);

		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your app's token
client.login(DISCORD_TOKEN);
