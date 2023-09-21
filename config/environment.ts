import dotenv from 'dotenv';

dotenv.config();

const { PORT, URI } = process.env;

const environment = {
  port: PORT || 5000,
  database: {
    uri: URI || ''
  }
};

export default environment;
