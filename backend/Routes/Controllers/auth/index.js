const auth = require('../../../Models/auth');
const middleware = require('../auth/middlewares');
const ajv = require('../../../Schema');
const express = require('express');
const router = express.Router();

const {
  signupSchema,
  loginSchema,
  updateUserSchema,
  updatePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyNewEmailSchema
} = require('../../../Schema/auth');

/**
 *
 * @param {Array} errArray
 * @return {String}
 */
function sumErrors(errArray) {
  const cb = (a, b) => a + b.message + ', ';
  return errArray.reduce(cb, '');
}

router.post('/signup', async (req, res) => {
  const validate = ajv.compile(signupSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .signup(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

router.post('/login', async (req, res) => {
  const validate = ajv.compile(loginSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .login(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === 'Password incorrect') {
        return res.status(401).json({
          success: false,
          error,
          results: null
        });
      }
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

router.get(
  '/users/:username',
  middleware.verifyUser.verifyAccessToken,
  async (req, res) => {
    const username = req.params.username;
    if (!username) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        results: null
      });
    }
    auth
      .getUser(username)
      .then(results => {
        return res.status(200).json({
          success: true,
          error: null,
          results
        });
      })
      .catch(error => {
        if (error === 'User not found') {
          return res.status(404).json({
            success: false,
            error,
            results: null
          });
        }
        return res.status(400).json({
          success: false,
          error,
          results: null
        });
      });
  }
);

router.post('/verify_email', async (req, res) => {
  const validate = ajv.compile(verifyEmailSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .verifyEmail(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

router.post('/verify_new_email', async (req, res) => {
  const validate = ajv.compile(verifyNewEmailSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .verifyNewEmail(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

router.post(
  '/update_user',
  middleware.verifyUser.verifyAccessToken,
  (req, res) => {
    const validate = ajv.compile(updateUserSchema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: sumErrors(validate.errors),
        results: null
      });
    }
    auth
      .updateUser(req.body)
      .then(results => {
        return res.status(200).json({
          success: true,
          error: null,
          results
        });
      })
      .catch(error => {
        return res.status(400).json({
          success: false,
          error,
          results: null
        });
      });
  }
);

router.post(
  '/update_password',
  middleware.verifyUser.verifyAccessToken,
  (req, res) => {
    const validate = ajv.compile(updatePasswordSchema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: sumErrors(validate.errors),
        results: null
      });
    }
    auth
      .updatePassword(req.body)
      .then(results => {
        return res.status(200).json({
          success: true,
          error: null,
          results
        });
      })
      .catch(error => {
        if (error === 'Password incorrect') {
          return res.status(401).json({
            success: false,
            error,
            results: null
          });
        }
        return res.status(400).json({
          success: false,
          error,
          results: null
        });
      });
  }
);

router.post('/forgot_password', (req, res) => {
  const validate = ajv.compile(forgotPasswordSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .forgotPassword(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === 'Email not linked to the username') {
        return res.status(401).json({
          success: false,
          error,
          results: null
        });
      }
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

router.post('/reset_password', (req, res) => {
  const validate = ajv.compile(resetPasswordSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: sumErrors(validate.errors),
      results: null
    });
  }
  auth
    .resetPassword(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      });
    });
});

module.exports = router;
