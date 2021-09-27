import app from './app.js';
import config from './config/index';

const { PORT } = config.server;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));