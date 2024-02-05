import { hash, compare } from 'bcrypt';

export const createHashedPassword = async (
  password: string,
): Promise<string> => {
  const saltOrRounds = 10;
  return hash(password, saltOrRounds);
};

export const validatePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return compare(password, hashedPassword);
};
