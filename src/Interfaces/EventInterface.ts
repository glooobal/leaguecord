export interface Event {
	name: string;
	once?: boolean | false;
	execute: (...args: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any -- This is a Discord.js event, so it can be anything.
}
