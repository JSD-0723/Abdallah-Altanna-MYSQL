import { Model, DataTypes } from 'sequelize';
import Database from '../db/database';

class Book extends Model {
  declare id: number;
  declare author: string;
  declare ISBN: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'author',
        msg: 'Book already exists'
      }
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'ISBN',
        msg: 'Book already exists'
      }
    }
  },
  { sequelize: Database, modelName: 'Book' }
);

export default Book;
