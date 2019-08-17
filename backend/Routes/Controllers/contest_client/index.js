const client = require('../../../Models/contest_client');
const auth = require('../../../Models/auth');
const app = require('../index');
const ajv = require('../../Schema');
const authMiddleware = require('../auth/middlewares');

app.get('/contests', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
    let results = groupMap(req.body.username);
    let groupIdArray = results.map(result => result.group_id);
    client
        .getContests(groupIdArray)
        .then((results) => {
            return res.status(200).json({
                success: true,
                error: null,
                results,
            });
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error,
                results: null,
            });
        });
});

app.get('/contests/', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
    let validate = ajv.compile(contestIdSchema);
    let valid = validate(req.query);
    if (!valid) {
        return res.status(400).json({
            success: false,
            error: 'Contest id required',
            results: null,
        });
    }
    if (!req.query.contestId) {
        return res.status(400).json({
            success: false,
            error: 'Contest id required',
            results: null
        });
    }
    client
        .getQuestions(req.query.contestId)
        .then((results) => {
            return res.status(200).json({
                success: true,
                error: null,
                results,
            });
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error,
                results: null,
            });
        });
});

app.get('/contests/', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
    let validate = ajv.compile(questionIdSchema);
    let valid = validate(req.query);
    if (!valid) {
        return res.status(400).json({
            success: false,
            error: 'Contest or question id are not inserted',
            results: null,
        });
    }
    if (!req.query.questionId) {
        return res.status(400).json({
            success: false,
            error: 'Question id required',
            results: null
        });
    }
    client
        .getQuestion(req.query.questionId)
        .then((results) => {
            return res.status(200).json({
                success: true,
                error: null,
                results,
            });
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error,
                results: null,
            });
        });
});

app.get('/questions', authMiddleware.verifyUser.verifyAccessToken, (req, res) => {
    let contestId  = contestMap();
    client
        .getQuestions(contestId)
        .then((results) => {
            return res.status(200).json({
                success: true,
                error: null,
                results,
            });
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error,
                results: null,
            });
        });
});