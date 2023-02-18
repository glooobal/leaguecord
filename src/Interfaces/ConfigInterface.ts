export {};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_EMBED_COLOR: string;
			RIOT_API_URL: string;
			RIOT_DDRAGON_URL: string;
			DISCORD_TOKEN: string;
			DISCORD_CLIENT_ID: string;
			RIOT_API_KEY: string;
			MONGO_URI: string;
		}
	}
}
