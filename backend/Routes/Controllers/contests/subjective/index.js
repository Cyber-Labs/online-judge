const subjective = require("../../../../Models/contests/subjective");
const ajv = require("../../../../Schema");
const express = require("express");
const router = express.Router();

const {
  checkSchema,
  updateSchema
} = require("../../../../Schema/contests/subjective");

router.get("to be decided", async (req, res) => {
  const validate = ajv.compile(checkSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: ValidityState.errors,
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
      if (error === "Not found user") {
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

router.post("to be decided", (req, res) => {
  let validate = ajv.compile(updateSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: ValidityState.errors,
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
      if (error === "User not found") {
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
