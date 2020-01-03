const express = require('express');
const router = express.Router();
const groups = require('.../../../Models/Groups/group-model');

const validator = require('../../../Schema');
const groupSchema = require('../Schema/groups/groups');

router.post('/addGroup', (req, res) => {
  let validate = validator.compile(groupSchema.addGroup);
  let valid = validate(req.body);
  if (!valid) {
    res.status(200).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
    return;
  }

  groups
    .addGroup(req.body)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => {
      res.status(200).json({ success: false, results: null, error });
    });
});

router.post('/customGroup', (req, res) => {
  let validate = validator.compile(groupSchema.customGroup);
  let valid = validate(req.body);
  if (!valid) {
    res.status(200).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
    return;
  }

  groups
    .customGroup(req.body)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => {
      res.status(200).json({ success: false, results: null, error });
    });
});

router.post('/copyGroup', (req, res) => {
  let validate = validator.compile(groupSchema.copyGroup);
  let valid = validate(req.body);
  if (!valid) {
    res.status(200).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
    return;
  }

  groups
    .copyGroup(req.body)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => {
      res.status(200).json({ success: false, results: null, error });
    });
});

router.get('/getAllGroupsOfUser', function(req, res) {
  req.query.username = req.body.username;
  groups
    .getAllGroupsOfUser(req.query)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => res.json({ success: false, results: null, error }));
});

router.get('/getAllGroups', function(req, res) {
  req.query.username = req.body.username;
  groups
    .getAllGroups(req.query)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => res.json({ success: false, results: null, error }));
});

router.get('/getGroupById', function(req, res) {
  req.query.username = req.body.username;
  req.query.group_id = req.body.group_id;
  groups
    .getGroupById(req.query)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => res.json({ success: false, results: null, error }));
});

router.put('/updateGroup', (req, res) => {
  let validate = validator.compile(groupSchema.updateGroup);
  let valid = validate(req.body);
  if (!valid) {
    res.status(200).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
    return;
  }
  groups
    .updateGroup(req.body)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => {
      res.status(200).json({ success: false, results: null, error });
    });
});
router.delete('/deleteGroup', function(req, res) {
  req.query.username = req.body.username;
  req.query.group_id = req.body.group_id;
  groups
    .getAllGroupsOfUser(req.query)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => res.json({ success: false, results: null, error }));
});

router.post('/addUserToGroup', (req, res) => {
  let validate = validator.compile(groupSchema.addUserToGroup);
  let valid = validate(req.body);
  if (!valid) {
    res.status(200).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
    return;
  }

  groups
    .addUserToGroup(req.body)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => {
      res.status(200).json({ success: false, results: null, error });
    });
});

router.post('/makeUserAdmin', (req, res) => {
  let validate = validator.compile(groupSchema.makeUserAdmin);
  let valid = validate(req.body);
  if (!valid) {
    res.status(200).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
    return;
  }

  groups
    .makeUserAdmin(req.body)
    .then(results => res.json({ success: true, results, error: null }))
    .catch(error => {
      res.status(200).json({ success: false, results: null, error });
    });
});

router.use((req, res) => {
  res.status(404).json({ success: false, error: 'not found', results: null });
});
