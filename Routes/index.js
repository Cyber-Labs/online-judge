const express = require('express');
const auth = require('../Controllers/auth');
const user = require('../Controllers/user');
const app = express();

app.post('/login', auth.login);
app.post('/signup', auth.signup);
app.post('/users/:username/forgot_password', auth.forgotPassword);
app.post('/users/:username/update_password', auth.updatePassword);
app.post('/users/:username/edit_user', user.editUser);
app.get('/users/:username', user.getUser);

module.exports = app;
