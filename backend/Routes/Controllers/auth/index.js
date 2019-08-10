const auth = require('../../../Models/auth');
const app = require('../index');
const middleware = require('../auth/middlewares');
const ajv = require('../../Schema');
const {
  signupSchema,
  loginSchema,
  updateUserSchema,
  updatePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../../../Schema/auth');

app.post('/signup', (req, res) => {
  let validate = ajv.compile(signupSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }
  auth
      .signup(req.body)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

app.post('/login', (req, res) => {
  let validate = ajv.compile(loginSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }
  auth
      .login(req.body)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results,
        });
      })
      .catch((error) => {
        if (error === 'Password incorrect') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

app.get('/users/:username', (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(404).json({
      success: false,
      error: 'Not found',
      results: null,
    });
  }
  auth
      .getUser(username)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results,
        });
      })
      .catch((error) => {
        if (error === 'User not found') {
          return res.status(404).json({
            success: false,
            error,
            results: null,
          });
        }
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

app.get('/auth/verify_email', (req, res) => {
  const accessToken = req.query.access_token;
  if (!accessToken) {
    return res.status(400).json({
      success: false,
      error: 'Access token required',
      results: null,
    });
  }
  auth
      .verifyEmail(accessToken)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

app.post(
    '/auth/update_user',
    middleware.verifyUser.verifyAccessToken,
    (req, res) => {
      let validate = ajv.compile(updateUserSchema);
      let valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: validate.errors,
          results: null,
        });
      }
      auth
          .updateUser(req.body)
          .then((results) => {
            return res.status(200).json({
              success: true,
              error: null,
              results,
            });
          })
          .catch((error) => {
            return res.status(400).json({
              success: false,
              error,
              results: null,
            });
          });
    }
);

app.post(
    '/auth/update_password',
    middleware.verifyUser.verifyAccessToken,
    (req, res) => {
      let validate = ajv.compile(updatePasswordSchema);
      let valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: validate.errors,
          results: null,
        });
      }
      auth
          .updatePassword(req.body)
          .then((results) => {
            return res.status(200).json({
              success: true,
              error: null,
              results,
            });
          })
          .catch((error) => {
            if (error === 'Password incorrect') {
              return res.status(401).json({
                success: false,
                error,
                results: null,
              });
            }
            return res.status(400).json({
              success: false,
              error,
              results: null,
            });
          });
    }
);

app.post('/auth/forgot_password', (req, res) => {
  const validate = ajv(forgotPasswordSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }
  auth
      .forgotPassword(req.body)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results,
        });
      })
      .catch((error) => {
        if (error === 'Email not linked to the username') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

app.post(
    '/auth/reset_password',
    middleware.verifyUser.verifyAccessToken,
    (req, res) => {
      const validate = ajv.compile(resetPasswordSchema);
      const valid = validate(req.body);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: validate.errors,
          results: null,
        });
      }
      auth
          .resetPassword(req.body)
          .then((results) => {
            return res.status(200).json({
              success: true,
              error: null,
              results,
            });
          })
          .catch((error) => {
            return res.status(400).json({
              success: false,
              error,
              results: null,
            });
          });
    }
);

module.exports = app;
