import 'dotenv/config.js';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './routes/index.routes.js';
import database from './database.js';

// Initialization
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(json());

// Routes
app.use('/api', router);

app.listen(app.get('port'), async () => {
  await database();
  console.log(`Server on Port: ${app.get('port')}`);
});
