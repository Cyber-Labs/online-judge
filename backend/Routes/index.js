const express = require('express');
const auth = require('../Controllers/auth');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/login', auth.login);
app.post('/signup', auth.signup);
app.post(
    '/users/:username/forgot_password',
    auth.verifyUser.verifyAccessToken,
    auth.forgotPassword
);
app.post(
    '/users/:username/update_password',
    auth.verifyUser.verifyAccessToken,
    auth.updatePassword
);
app.post(
    '/users/:username/update_user',
    auth.verifyUser.verifyAccessToken,
    auth.editUser
);
app.get('/users/:username', auth.getUser);

module.exports = app;
