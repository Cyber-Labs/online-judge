const client = require('../../../Models/contest_client')
const app = require('../index')
const ajv = require('../../Schema')
const authMiddleware = require('../auth/middlewares')

app.get('/contests', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
  const results = client.groupMap(req.body.username)
  const groupIdArray = results.map(result => result.group_id)
  client
    .getContests(groupIdArray)
    .then((results) => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      })
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      })
    })
})

app.get('/contests/', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
  const validate = ajv.compile(ajv.contestIdSchema)
  const valid = validate(req.query)
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: 'Contest id required',
      results: null
    })
  }
  if (!req.query.contestId) {
    return res.status(400).json({
      success: false,
      error: 'Contest id required',
      results: null
    })
  }
  client
    .getQuestions(req.query.contestId)
    .then((results) => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      })
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      })
    })
})

app.get('/contests/', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
  const validate = ajv.compile(ajv.questionIdSchema)
  const valid = validate(req.query)
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: 'Contest or question id are not inserted',
      results: null
    })
  }
  if (!req.query.questionId) {
    return res.status(400).json({
      success: false,
      error: 'Question id required',
      results: null
    })
  }
  client
    .getQuestion(req.query.questionId)
    .then((results) => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      })
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      })
    })
})

app.get('/questions', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
  client.sort()
  const contestId = client.contestMap()
  client
    .getQuestions(contestId)
    .then((results) => {
      return res.status(200).json({
        success: true,
        error: null,
        results
      })
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
        results: null
      })
    })
})
