<h1 align="center">
    <br>
    <a href="https://canary.discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=274878286912&scope=applications.commands%20bot">
        <img src="https://raw.githubusercontent.com/glooobal/leaguecord/main/assets/logo-circle.png" alt="Leaguecord" width="200">
    </a>
    <br>
    Leaguecord
    <br>
</h1>

<h4 align="center">Bring the<a href="https://www.leagueoflegends.com/pl-pl/" target="_blank">League of Legends</a> world to your discord server!</h4>

<p align="center">
    <a href="https://canary.discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=274878286912&scope=applications.commands%20bot">
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
    <a href="#credits">Credits</a> •
    <a href="#license">License</a>
</p>

## Features

-   `/summoner` - Get information about a summoner
-   `/match` - Get information about a match
-   `/champion` - Get information about a champion
-   `/item` - Get information about an item
-   `/runes` - Get information about a runes for champion
-   `/mastery` - Get information about player champion mastery
-   `/news` - Get information about latest news from League of Legends and Teamfight Tactics
-   `/patch` - Get information about latest patch
-   `/status` - Get information about League of Legends and Teamfight Tactics servers status
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

## Credits

This software uses the following open source packages:

-   [Node.js](https://nodejs.org/)
-   [discord.js](https://discord.js.org/)
-   [mongoose](https://mongoosejs.com/)
-   Logo, champions emojis, mastery emojis and rank emojis used by Leaguecord are property of [Riot Games](https://www.riotgames.com/)

## License

[GPL-3.0](https://github.com/glooobal/leaguecord/blob/main/LICENSE)
