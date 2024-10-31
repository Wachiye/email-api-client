/* eslint-disable no-console */
import mongoose from 'mongoose';
import appConfig from './app.config';
import logger from '../lib/logger';

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
	logger.error(`MongoDB connection error: ${err}`);
	process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {mongoose.Connection} Mongoose connection
 * @public
 */
export default function connectDb(debug = false): mongoose.Connection {
	mongoose.set('debug', debug);
	mongoose
		.connect(appConfig.mongo.uri)
		.then(() => logger.info('mongoDB connected...'));
	return mongoose.connection;
}