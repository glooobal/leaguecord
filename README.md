<h1 align="center">
    <br>
    <a href="https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=274878286912&scope=applications.commands%20bot">
        <img src="https://raw.githubusercontent.com/glooobal/leaguecord/new/assets/logo-circle.png" alt="Leaguecord" width="200">
    </a>
    <br>
    Leaguecord
    <br>
</h1>

<h4 align="center">Bring the League of Legends world to your discord server!</h4>

<p align="center">
    <a href="https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=274878286912&scope=applications.commands%20bot">
        <img src="https://img.shields.io/badge/Invite-Me-7289da?style=for-the-badge" alt="Invite Me">
    </a>
    <img src="https://img.shields.io/codefactor/grade/github/glooobal/leaguecord?color=ff69b4&style=for-the-badge">
    <a href="https://discord.gg/kZEyFAJwNH">
        <img src="https://img.shields.io/badge/Support-Server-7289da?style=for-the-badge" alt="Support Server">
    </a>
</p>

<p align="center">
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
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
-   `/news` - Set up a news system for your server
-   `/help` - Get information about all commands
-   `/invite` - Get invite link to add Leaguecord to your server
-   `/info` - Get information about Leaguecord

## Installation

### Requirements

-   [Node.js](https://nodejs.org/en/) v16.18.0 or newer
-   [MongoDB](https://www.mongodb.com/) v6.0.0 or newer
-   [Riot Games API Key](https://developer.riotgames.com/)
-   [Discord Bot Application](https://discord.com/developers/applications)

### Installation

```bash
# Clone this repository
git clone https://github.com/glooobal/leaguecord.git

# Go into the repository
cd leaguecord

# Install dependencies
npm install

# Copy .env.example to .env
cp .env.example .env

# Edit .env file
nano .env

# Run the app
npm build && npm start
```

## Notes

-   This project is still in development, so there may be some bugs (but I'm trying to fix them as soon as possible)
-   Currently, emojis are not in the repository, I'm working on the solution to create them automatically!
-   If you find any bugs, please report them in the [issues](https://github.com/glooobal/leaguecord/issues) section
-   If you have any suggestions, please write them in the [issues](https://github.com/glooobal/leaguecord/issues) section
-   If you want to help with the development of this project, please contact me on [support server](https://discord.gg/kZEyFAJwNH)
-   If you want to support me, you can invite Leaguecord to your server using [this link](https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=274878286912&scope=applications.commands%20bot)
-   If you want to support me financially, you can do it [here](https://www.buymeacoffee.com/glooobal)

## Credits

This software uses the following open source packages:

-   [Node.js](https://nodejs.org/)
-   [discord.js](https://discord.js.org/)
-   [mongoose](https://mongoosejs.com/)
-   Logo, champions emojis, mastery emojis and rank emojis used by Leaguecord are property of [Riot Games](https://www.riotgames.com/)

## License

This project is licensed under the terms of the [GPL-3.0](https://github.com/glooobal/leaguecord/blob/main/LICENSE)
