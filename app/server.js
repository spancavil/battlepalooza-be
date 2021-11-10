import app from './app.js';
import config from './config/index.js';
import logger from './logger/bunyan.js';

const { PORT } = config.server;

app.listen(PORT, () => logger.info(`Server started on PORT ${PORT}`));