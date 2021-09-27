import Bunyan from 'bunyan';

const logger = Bunyan.createLogger({
    name: "New Proyect",
    level: "info",
    stream: process.stdout,
});

export default logger;