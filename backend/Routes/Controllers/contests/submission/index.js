const submission = require("../../../../Models/contests/submissions");
const ajv = require("../../../../Schema");
const express = require("express");
const router = express.Router();

const { submitSchema } = require("../../../../Schema/contests/submissions");

router.get("/:contestid/:username/result", async (req, res) => {
  const contestId = req.params.contest_id;
  const username = req.body.username;
  if (!contestId) {
    return res.status(404).json({
      success: false,
      error: "Not found any contests",
      results: null
    });
  }
  if (!username) {
    return res.status(404).json({
      success: false,
      error: "Not found any user",
      results: null
    });
  }
  submission
    .result({
      contestId,
      username
    })
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results: results
      });
    })
    .catch(error => {
      if (error === "Result not found") {
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

router.post("/:contestid/:username/:questionid/submit", (req, res) => {
  let validate = ajv.compile(submitSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      sucess: false,
      error: ValidityState.errors,
      results: null
    });
  }
  const questionType = req.body.questionType;
  if (questionType === 1) {
    submission
      .submitSubjective(req.body)
      .then(results => {
        return res.status(200).json({
          success: true,
          error: null,
          results
        });
      })
      .catch(error => {
        if (error === "Not found question") {
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
  submission.submitMCQ(req.body).then(results => {
    return res
      .status(200)
      .json({
        success: true,
        error: null,
        results
      })
      .catch(error => {
        if (error === "Not found question") {
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
});

module.exports = router;
