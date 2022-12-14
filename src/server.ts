import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import 'dotenv/config';
import AppDataSource from '@configs/data-source.config';
import routes from '@routes/index';
import axios from 'axios';

const app = express();
const httpServer = createServer(app);

AppDataSource.initialize()
  .then(async () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    app.use('/api', routes); // /api...

    httpServer
      .listen(process.env.PORT || 3000, () => {
        console.log(`API Server Start At Port ${process.env.PORT}`);
        if (process.env.NODE_ENV === 'initialize') {
          axios({
            method: 'post',
            url: 'http://localhost:3000/api/user/signup',
            data: {
              name: 'user1',
            },
          });
        }
      })
      .on('error', (err) => {
        console.log(err);
        process.exit(1);
      });
  })
  .catch((err) => console.log(err));
