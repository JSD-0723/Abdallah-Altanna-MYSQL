import { Sequelize } from 'sequelize';
import environment from '../config/environment';

const { uri } = environment.database;

const Database = new Sequelize(uri, {
  logging: console.log,
  define: {
    freezeTableName: true
  }
});

const connect = async () => {
  try {
    await Database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();

export default Database;
