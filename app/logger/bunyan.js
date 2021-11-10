import Bunyan from 'bunyan';

const logger = Bunyan.createLogger({
    name: "BP-api",
    level: "info",
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            path: '/var/www/myapp/myapp-errors.log'
        }
    ]
});

export default logger;