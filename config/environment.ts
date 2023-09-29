import dotenv from 'dotenv';

dotenv.config();

const { PORT, DATABASE_URI, JWT_SECRET, JWT_LIFETIME } = process.env;

const environment = {
  port: PORT || 5000,
  database: {
    uri: DATABASE_URI || ''
  },
  jwt: {
    jwtSecret: JWT_SECRET || '',
    jwtLifetime: JWT_LIFETIME || ''
  }
};

export default environment;
