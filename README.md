# Discord Bot - NodeJS


## Description

This is a simple multitask Discord bot developed in Node.js. It provides various functionalities to enhance your 
Discord server experience, including commands to clear messages, interact with users, and more. The bot is designed 
to be easy to extend with additional commands and features.


# Installation

To install and run the Discord bot, follow these steps:

1. **Clone the repository:**
```bash
   git clone https://github.com/yourusername/discord-bot.git
   cd discord-bot
```
2. **Install dependencies:**
```bash
    npm install
```
3. **Configure environment variables:**  
Open the `.env` file in the root directory of the project and update the following environment variables with your own
Discord bot information:
```env
    DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
    DISCORD_CLIENT_ID=YOUR_CLIENT_ID_HERE
    DISCORD_GUILD_ID=YOUR_GUILD_ID_HERE
```
4. **Run the bot:**
```bash
    npm start
```


## Dependencies

This project uses the following dependencies:

* `Node.js`: >= 20.11.1
* `@discordjs/rest`: ^2.3.0
* `discord-api-types`: ^0.37.93
* `discord.js`: ^14.15.3
* `dotenv`: ^16.4.5
* `jsdoc`: (dev dependency): ^4.0.3


## Usage

Once the bot is running, you can use the following commands in your Discord server:

### ping

* **Description:** Check the bot's latency.
* **Usage:** Type `/ping` to get the current ping of the bot

### clear [amount]

* **Description:** Deletes a specified number of messages from the channel.
* **Usage:** Type `/clear [amount]` where `amount` is the number of messages to delete (between 1 and 100).

### clearall

* **Description:** Deletes all messages from the channel after confirmation
* **Usage:** Type `/clearall` to initiate the command. You will be prompted with a confirmation message where you can 
choose to accept or decline the action.


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.