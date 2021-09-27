import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRouter from './routes/index';
import './db'
const app = express();

// CORS Middleware
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

// Use Routes
app.use('/', indexRouter);



export default app;
