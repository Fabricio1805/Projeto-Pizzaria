import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'node:path';
import { router } from './routes/routes';
import Errors from './shared/middlewares/Errors';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads'))
);

app.use(Errors);

const port = 3001;

app.listen(3001, () => console.log(`Server is Running in port ${port}!`));
