import jwt from 'jsonwebtoken';
import environment from '../config/environment';

const { jwtSecret, jwtLifetime } = environment.jwt;

export const createJwt = (id: number) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: jwtLifetime });
};
