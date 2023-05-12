import jwt from 'jsonwebtoken';

export function getTokenCode(data) {
  return jwt.sign({ data }, process.env.SEED_JWT, {
    expiresIn: Number.parseInt(process.env.TIME_JWT_CODE, 10) || 31536000000 * 10,
  });
}

export default {
  getTokenCode,
};
