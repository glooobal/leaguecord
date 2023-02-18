import { connect, set } from 'mongoose';
import { Logger } from '../Logger';

export default async function loadDatabase() {
	try {
		if (!process.env.MONGO_URI)
			Logger.error(
				'MongoDB URL not found. Please add it to your .env file.'
			);

		set('strictQuery', false);

		await connect(`${process.env.MONGO_URI}`)
			.then(() => {
				Logger.info('Successfully connected to MongoDB.');
			})
			.catch((err) => Logger.error(err));
	} catch (err) {
		Logger.error(err as string);
	}
}
