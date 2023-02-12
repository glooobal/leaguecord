# Installation

It's very easy, just follow up the instructions.

## Discord Setup

1. Create a bot application in the [Discord Developer Portal](https://discord.com/developers/applications)

2. Copy the bot's token and client id from the Discord Developer Portal and paste it into the DISCORD_TOKEN and DISCORD_ID field in the .env file.

3. Invite bot to your discord server using the URL Generator.

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

4. Once you have invited the bot to your server discord server, use following command in your terminal (It's very important!)

```
npm run deploy or yarn run deploy
```

4. Start the bot by running the following command in your terminal.

```
npm start or yarn run start
```
