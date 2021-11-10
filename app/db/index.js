import Mongoose from 'mongoose';
import config from '../config/index.js';
import logger from '../logger/bunyan.js';

Mongoose.connect(`${config.database.host}`,{
    useNewUrlParser: true,
    // user: db.common.database.username,
    // pass: db.common.database.password,
})
    .then((_) => {
        logger.info('MongoDb connected');
    })
    .catch((error) => {
        logger.error(`Error: ${error.name} Message: ${error.message} Status Code: ${error.status}`);
        logger.error(`Error: ${error.name} Message: ${error.message} Status Code: ${error.status}`);
    })
