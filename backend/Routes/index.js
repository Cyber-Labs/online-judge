const express = require('express');
const auth = require('../Controllers/auth');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/login', auth.login);
app.post('/signup', auth.signup);
app.post(
    '/auth/forgot_password',
    auth.verifyUser.verifyAccessToken,
    auth.forgotPassword
);
app.post(
    '/auth/update_password',
    auth.verifyUser.verifyAccessToken,
    auth.updatePassword
);
app.post(
    '/auth/update_user',
    auth.verifyUser.verifyAccessToken,
    auth.updateUser
);
app.get('/users/:username', auth.getUser);

module.exports = app;
