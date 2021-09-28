import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import './db/index.js';
import morgan from 'morgan';

const app = express();


// CORS Middleware
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

app.use(morgan('tiny'));

// Use Routes
app.use('/', router);



export default app;
