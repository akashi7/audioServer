import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export function requiredLogin(req, res, next) {
  const token = req.headers.authorization.replace("Bearer ", "");

  verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
    if (err) {
      res.status(401).send({
        status: 401,
        message: 'please login first'
      });
    }
    else {
      req.user = decoded;
      next();
    }
  });

}