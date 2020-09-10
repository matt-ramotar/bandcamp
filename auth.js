const db = require('./db/models');
//

const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");

const { secret, expiresIn } = jwtConfig;

const { User } = require('./db/models');

// const bearerToken = require("express-bearer-token");

// const getUserToken = (user) => {
//   // Don't store the user's hashed password
//   // in the token data.
//   const userDataForToken = {
//     id: user.id,
//     email: user.email,
//   };

//   // Create the token.
//   const token = jwt.sign(
//     { data: userDataForToken },
//     secret,
//     { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
//   );

//   return token;
// };

// const restoreUser = (req, res, next) => {
//   // token being parsed from request header by the bearerToken middleware
//   // function in app.js:
//   const { token } = req;

//   if (!token) {
//     const err = new Error("Unauthorized");
//     err.status = 401;
//     return next(err);
//   }

//   return jwt.verify(token, secret, null, async (err, jwtPayload) => {
//     if (err) {
//       err.status = 401;
//       return next(err);
//     }

//     const { id } = jwtPayload.data;

//     try {
//       req.user = await User.findByPk(id);
//     } catch (e) {
//       e.status = 401;
//       return next(e);
//     }

//     if (!req.user) {
//       // Send a "401 Unauthorized" response status code
//       // along with an "WWW-Authenticate" header value of "Bearer".
//       return res.set("WWW-Authenticate", "Bearer").status(401).end();
//     }

//     return next();
//   });
// };

// const requireAuth = [bearerToken(), restoreUser];

const getUserToken = async (user) => {
  const token = await jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn })
  return token;
}

const getUserFromToken = async (token) => {
  try {
    const payload = jwt.verify(
      token,
      secret
    );
    return await User.findByPk(payload.id);
  } catch (err) {
    return null;
  }
}


module.exports = {
  getUserToken,
  getUserFromToken
};



// //---

// const loginUser = (req, res, user) => {
//   req.session.auth = {
//     userId: user.id,
//   };
// };

// const logoutUser = (req, res) => {
//   delete req.session.auth;
// };

// const requireAuth = (req, res, next) => {
//   if (!res.locals.authenticated) {
//     return res.redirect('/user/login');
//   }
//   return next();
// };
