import { DataSource } from 'typeorm';
import { User } from './entity/user.entity.js';
import { ParseRequest } from './entity/parse-requests.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: [User, ParseRequest],
  logging: false,
  synchronize: true
});

export async function initializeDataSource() {
  try {
    AppDataSource.initialize();
    console.log('Data source successfully initialized');
  } catch (error) {
    console.log('Data source initialization FAILED', error);
  }
}
