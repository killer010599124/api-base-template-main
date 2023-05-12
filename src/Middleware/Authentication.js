import jwt from 'jsonwebtoken';

export function responseError(res, err) {
  return res.status(401).json({ err });
}

function getToken(req) {
  return req ? req.headers['x-access-token'] || req.body.token || req.headers.Authorization : null;
}

export function validateTokenApp(req, res, next) {
  const token = getToken(req);

  if (!token) return responseError(res, 'Token is trash.');

  return jwt.verify(token, process.env.SEED_JWT, async (err, decoded) => {
    if (err) return responseError(res, err.toString());
    if (decoded.data) {
      req.body.tokenId = decoded.data._id;
      req.body.tokenPhone = decoded.data.phone || null;
      req.body.tokenAuth = token;
      req.body.type = decoded.data.type;
      req.body.moduleToken = decoded.data.module;
      return next();
    }

    return responseError(res, 'Token is trash');
  });
}

export default {
  validateTokenApp,
};
