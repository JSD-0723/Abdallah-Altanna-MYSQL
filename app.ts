import express from 'express';
import { createServer } from 'http';

import Database from './db/database';
import environment from './config/environment';
import router from './routers';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import notFoundMiddleware from './middlewares/notFoundMiddleware';

const { port } = environment;

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

Database.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
});
