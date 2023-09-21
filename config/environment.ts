import dotenv from 'dotenv';

dotenv.config();

const { PORT, DATABASE_URI } = process.env;

const environment = {
  port: PORT || 5000,
  database: {
    uri: DATABASE_URI || ''
  }
};

export default environment;
