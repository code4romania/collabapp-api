import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import index from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(json());
app.use(urlencoded({
  extended: false,
}));
app.use(morgan('combined'));

app.use('/', index);

export default app;