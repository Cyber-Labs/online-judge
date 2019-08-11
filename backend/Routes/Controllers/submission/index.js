const submission = require("../../../Models/submission");
const app = require("../index");
const middleware = require("./middlewares");
// schema present, to be added later

// validate from submission schema
// sabse pehle ye user file ke code ko server pe store karega
// .then remoteinterview se compile karega
//. then database me store karaega

//req.body for app.post:
// contest_id, question_id, username, user_output,
// isNegative, isPartial, max_score, question_type

app.post("/contests/:contestid/:questionid/submit", (req, res) => {
  // let validate = ajv.compile(some schema);
  // let valid = validate.(req.body);
  if (!valid) {
    return res.status(400).json({
      sucess: false,
      error: ValidityState.errors,
      results: null
    });
  }
  const question_type = req.body.quewstion_type;
  if (question_type === 1) {
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
        return res.status(400).json({
          success: false,
          error,
          results: null
        });
      });
  });
});

app.get("/contests/:contestid/:questionid/result", (req, res) => {
  const contest_id = req.params.contest_id;
  if (!contestid) {
    return res.status(404).json({
      success: false,
      error: "Not found any contests",
      results: null
    });
  }
  submission
    .result({
      contest_id,
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
      if (error == "Not found") {
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

module.exports = app;
