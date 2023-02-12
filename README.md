# Leaguecord, a Discord Bot Integrated with Riot Games API

Leaguecord is a Discord bot that brings the world of League of Legends to your Discord server. With Leaguecord, you can access information about your favorite summoners, champions, and games. The bot is created using discord.js and axios.

## Features

-   Lookup summoner information
-   View summoner mastery scores

## Requirements

-   Node.js https://nodejs.org/en/download/
-   Riot Games API Key https://developer.riotgames.com/

## Installation

1. Clone the repository and navigate to the project directory in your terminal.

```
git clone https://github.com/glooobal/Leaguecord.git
cd Leaguecord
```

2. Install the dependencies

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

Once the bot is up and running, invite it to your Discord server by using the Discord OAuth2 URL Generator.

Then use following command in your terminal (It's very important!)

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
