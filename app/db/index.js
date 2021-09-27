import Mongoose from 'mongoose';
import config from '../config/index';
import logger from '../logger/bunyan';

Mongoose.connect(`${config.database.host}:${config.database.port}/${config.database.name}`,{
    useNewUrlParser: true,
    // user: db.common.database.username,
    // pass: db.common.database.password,
})
    .then((_) => {
        logger.info('MongoDb connected');    
    })
    .catch((error) => {
        logger.error(`Error: ${error.name} Message: ${error.message} Status Code: ${error.status}`);
    })
