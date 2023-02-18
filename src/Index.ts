import 'dotenv/config';

import { LeaguecordClient } from './Structures/Client';

import { Logger } from './Utils/Logger';

export const client = new LeaguecordClient();

process.on('uncaughtException', (err, origin) => {
	Logger.error(
		`Caught exception: ${err.message}\nException origin: ${origin}`,
		err
	);
});

process.on('unhandledRejection', (reason, promise) => {
	Logger.error(
		`Unhandled Rejection at: ${String(promise)}\nreason: ${String(reason)}`
	);
});
