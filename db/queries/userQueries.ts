import { UniqueConstraintError } from 'sequelize';
import User from '../../models/user';

// create user
export const createUser = async (user: User): Promise<number | null> => {
  try {
    const result = await User.create(user);

    return result ? result.id : null;
  } catch (error) {
    const exception = error as UniqueConstraintError;
    return exception.name === 'SequelizeUniqueConstraintError' ? -1 : null;
  }
};

// read user by email
export const readUserByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } });
};
