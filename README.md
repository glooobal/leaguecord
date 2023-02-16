<h1 align="center">
    <br>
    <a href="https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=296960&scope=applications.commands%20bot">
        <img src="https://raw.githubusercontent.com/glooobal/leaguecord/new/assets/logo-circle.png" alt="Leaguecord" width="200">
    </a>
    <br>
    Leaguecord
    <br>
</h1>

<h4 align="center">Bring the League of Legends world to your discord server!</h4>

<p align="center">
    <a href="https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=296960&scope=applications.commands%20bot">
        <img src="https://img.shields.io/badge/Invite-Me-7289da?style=for-the-badge" alt="Invite Me">
    </a>
    <img src="https://img.shields.io/codefactor/grade/github/glooobal/leaguecord?color=ff69b4&style=for-the-badge">
    <a href="https://www.buymeacoffee.com/glooobal">
        <img src="https://img.shields.io/badge/Buy%20me%20a%20coffe-here-orange?style=for-the-badge">
    </a>
    <img src="https://img.shields.io/github/package-json/v/glooobal/leaguecord?color=ff69b4&style=for-the-badge">
    <a href="https://discord.gg/kZEyFAJwNH">
        <img src="https://img.shields.io/badge/Support-Server-7289da?style=for-the-badge" alt="Support Server">
    </a>
</p>

<p align="center">
    <a href="#features">Features</a> •
    <a href="#setup">Setup</a> •
    <a href="#notes">Notes</a> •
    <a href="#credits">Credits</a> •
    <a href="#license">License</a>
</p>

## Features

-   `/summoner <name> <region>` - Get information about a summoner
-   `/game <summoner>` - Get information about a summoner's current game
-   `/champion <name>` - Get information about a champion
-   `/item <name>` - Get information about an item
-   `/runes <champion>` - Get information about a runes for champion
-   `/mastery <summoner>` - Get information about summoner champion mastery
-   `/patch` - Get information about latest patch
-   `/status` - Get information about League of Legends and Teamfight Tactics servers status
-   `/news <subcommand>` - Setup a news system for your server
-   `/help` - Get information about all commands
-   `/invite` - Get invite link to add Leaguecord to your server
-   `/info` - Get information about Leaguecord

## Setup

### Requirements

-   [Node.js](https://nodejs.org/en/) v16.18.0 or newer
-   [MongoDB](https://www.mongodb.com/) v6.0.0 or newer
-   [Riot Games API Key](https://developer.riotgames.com/)
-   [Discord Bot Application](https://discord.com/developers/applications)

### Installation

1. Clone this repository, copy .env.example to .env and fill in the values as detailed below
- Go to https://developer.riotgames.com/, get your API key and fill in the RIOT_API_KEY
- Create a new application on https://discord.com/developers/applications
- Go to the Bot tab and click "Add Bot"
    - Click "Reset Token", copy new token and fill in the DISCORD_TOKEN
    - Make sure that you have enabled the "Presence Intent" and "Message Content Intent"
    - Go to the OAuth2 tab and copy the "Client ID", fill in the DISCORD_CLIENT_ID
2. Add your bot to your server using this link: https://discord.com/api/oauth2/authorize?client_id=DISCORD_CLIENT_ID&permissions=296960&scope=applications.commands%20bot
3. Install all dependencies using `npm install`
4. Run the bot using `npm start` :tada:

## Notes

-   This project is still in development, so there may be some bugs (but I'm trying to fix them as soon as possible)
-   Currently, emojis are not in the repository, I'm working on the solution to create them automatically
-   If you find any bugs, please report them in the: [Support Server](https://discord.gg/kZEyFAJwNH)
-   If you have any suggestions, please write them in the: [Support Server](https://discord.gg/kZEyFAJwNH)
-   If you want to help with the development of this project, please contact me on discord (global#9451) or on [Support Server](https://discord.gg/kZEyFAJwNH)
-   If you want to support me, you can invite Leaguecord to your server using [This Link](https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=296960&scope=applications.commands%20bot)
-   If you want to support me financially, you can do it [Here](https://www.buymeacoffee.com/glooobal)

Thanks for using Leaguecord! :heart:

## Credits

This software uses the following open source packages:

-   [Node.js](https://nodejs.org/)
-   [discord.js](https://discord.js.org/)
-   [mongoose](https://mongoosejs.com/)
-   Logo (icon), champions/rank/mastery emojis are property of [Riot Games](https://www.riotgames.com/)

## License

This project is licensed under the terms of the [GPL-3.0](https://github.com/glooobal/leaguecord/blob/main/LICENSE)
