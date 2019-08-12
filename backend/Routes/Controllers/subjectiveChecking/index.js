const subjectiveChecking = require("../../../Models/db");
const app = require("../index");
// schema present, to be added later

app.get("/to be set", (req, res) => {
  const contestId = req.body.contestId;
  const questionId = req.body.questionId;
  const contestId = req.body.contestId;
  subjectiveChecking
    .userSolution(req.body)
    .then(results => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      });
    })
    .catch(error => {
      if (error === "Not found") {
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

app.post("/to be set", (req, res) => {});
