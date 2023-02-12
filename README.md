# Leaguecord - A Discord Bot Integrated with Riot Games API

Leaguecord is a Discord bot that brings the world of League of Legends to your Discord server. With Leaguecord, you can access information about your favorite summoners, champions, and games. The bot is created using discord.js and axios.

## Features

-   Lookup summoner information
-   Check is summoner in game
-   View summoner mastery scores

## Requirements

-   [Node.js](https://nodejs.org/en/download/)
-   [Discord Developer Application](https://discord.com/developers/applications)
-   [Riot Games API Key](*https://developer.riotgames.com/)

## Discord Setup

1. Create a bot application in the [Discord Developer Portal](https://discord.com/developers/applications)

2. Copy the bot's token and client id from the Discord Developer Portal and paste it into the DISCORD_TOKEN and DISCORD_ID field in the .env file.

## Installation

1. Clone the repository and navigate to the project directory in your terminal.

```
git clone https://github.com/glooobal/Leaguecord.git
cd Leaguecord
```

2. Install the dependencies.

```
npm install or yarn
```

3. Fill up data in .env file.

```
DISCORD_EMBED_COLOR=""

RIOT_API_URL="api.riotgames.com/lol"
RIOT_DDRAGON_URL="http://ddragon.leagueoflegends.com"

RIOT_KEY=""

DISCORD_TOKEN=""
DISCORD_ID=""
```

4. Start the bot by running the following command in your terminal.

```
npm start or yarn run start
```

## Usage

Once you have invited the bot to your server discord server, use following command in your terminal and restart the bot (It's very important!)

```
npm run deploy or yarn run deploy
```

# Contributing

This project is open source and contributions are welcome! If you would like to contribute to the development of Leaguecord, please follow these steps:

1. Fork the repository to your GitHub account
2. Clone the repository to your local machine
3. Create a new branch for your changes
4. Commit your changes and push to your fork
5. Create a pull request back to the original repository

# License

This project is licensed under the MIT License. See the LICENSE file for details.
