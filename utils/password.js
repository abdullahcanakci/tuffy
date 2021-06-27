import bcrypt from "bcrypt";

const checkPassword = async (hash, password) => {
  const result = await bcrypt.compare(password, hash);

  return result;
};

const hashPassword = async (password) => {
  const hash = bcrypt.hash(password, 10);

  return hash;
};

export { checkPassword, hashPassword };
