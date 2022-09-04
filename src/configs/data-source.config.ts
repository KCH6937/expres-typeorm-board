import 'reflect-metadata';
import { DataSource } from 'typeorm';

// DB Configuration
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306, // MySQL default port
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
});

export default AppDataSource;
