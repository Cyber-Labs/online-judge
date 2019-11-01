const client = require('../../../Models/contest_client');
const middleware = require('./../auth/middlewares');
const ajv = require('../../../Schema');
const express = require('express');
const router = express.Router();

const {
  contestIdSchema,
  questionIdSchema
} = require('./../../../Schema/contestClient');

router.get('/contests', middleware.verifyUser.verifyAccessToken, (req, res) => {
  var groupresults;
  var groupIdArray;
  if (
    Object.entries(req.query).length === 0 &&
    req.query.constructor === Object
  ) {
    client
      .groupMap(req.body.username)
      .then(results => {
        groupresults = results;
        groupIdArray = groupresults.map(result => result.group_id);
        client
          .getContests(groupIdArray)
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
      })
      .catch(error => {
        return res.status(400).json({
          success: false,
          error,
          results: null
        });
      });
  } else {
    const validate = ajv.compile(contestIdSchema);
    const valid = validate(req.query);
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: 'Contest id required',
        results: null
      });
    }
    if (!req.query.contestId) {
      return res.status(400).json({
        success: false,
        error: 'Contest id required',
        results: null
      });
    } else if (req.query.contestId && !req.query.questionId) {
      client
        .getQuestions(req.query.contestId)
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
    } else if (req.query.contestId && req.query.questionId) {
      const validate = ajv.compile(questionIdSchema);
      const valid = validate(req.query);
      if (!valid) {
        return res.status(400).json({
          success: false,
          error: 'Contest or question id are not inserted',
          results: null
        });
      }
      client
        .getQuestion(req.query.questionId)
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
  }
});

router.get(
  '/questions',
  middleware.verifyUser.verifyAccessToken,
  (req, res) => {
    var maparray;
    client
      .groupMap(req.body.username)
      .then(results => {
        var groupresults = results;
        var groupIdArray = groupresults.map(result => result.group_id);
        client.getContests(groupIdArray).then(results => {
          maparray = results.map(function(result) {
            if (result.this_status == 2) {
              return result.id;
            }
          });
          console.log(maparray);
          client
            .getAllQuestions(maparray)
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

module.exports = router;
