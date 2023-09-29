import { DataTypes, Model } from 'sequelize';

import Book from './book';
import Database from '../db/database';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

class User extends Model<IUser> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: Database,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

User.hasMany(Book, { as: 'books', foreignKey: 'userId' });
Book.belongsTo(User, { as: 'users', foreignKey: 'userId' });

export default User;
