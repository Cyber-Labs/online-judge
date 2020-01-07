const subjective = require('../../../../Models/contests/subjective');
const express = require('express');
const router = express.Router();

const validator = require('../../../../Schema');
const {
  checkSchema,
  updateSchema
} = require('../../../../Schema/contests/subjective');

router.get('/:adminid/:contestid/:username/:questionid', async (req, res) => {
  let validate = validator.compile(checkSchema.checkSubjective);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
  }
  subjective
    .checkSubjective(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === 'Not found user') {
        return res.status(404).json({
          success: true,
          error,
          results: null
        });
      }
      return res.status(400).json({
        success: true,
        error,
        results: null
      });
    });
});

router.post('/:adminid/:contestid/:username/:questionid/submit', (req, res) => {
  let validate = validator.compile(updateSchema.updateSubjective);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors.reduce
        ? validate.errors.reduce(function(prev, curr) {
            return curr.message + ';' + prev;
          }, '')
        : validate.errors,
      results: null
    });
  }
  subjective
    .updateSubjective(req.body)
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
});

module.exports = router;
