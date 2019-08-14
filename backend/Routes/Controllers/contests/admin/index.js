const contestadmin = require('../../../../Models/contestadmin');
const middleware = require('../../auth/middleware');
const ajv = require('../../../../Schema');
const express = require('express');
const router = express.Router();

const {
  deleteQuestionSchema,
  deleteContestSchema,
  deleteAdminSchema,
  editQuestionSchema,
  editAdminSchema,
  editContestSchema,
  getAllQuestionsSchema,
  getSingleQuestionSchema,
  getSingleContestSchema,
  createNewQuestionSchema,
  createNewContestSchema
} = require('../../../../Schema/contestadmin');

router.post('/delete_question', middleware.verifyUser.verifyAccessToken, (req,res)=>{
	let validate = ajv.compile(deleteQuestionSchema);
    let valid = validate(req.body);
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
  constestadmin
    .deleteQuestion(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You are not an admin') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });


})

router.post('/edit_question',middleware.verifyUser.verifyAccessToken,(req,res)=>{
  let validate = ajv.compile(editQuestionSchema);
    let valid = validate(req.body);
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
  constestadmin
    .editQuestion(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You are not an admin') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
})

router.get('/questions/:question_id',(req,res)=>{
  req.body.question_id=req.params.question_id;
     let validate = ajv.compile(getSingleQuestionSchema);
    let valid = validate(req.body);
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
    contestadmin
      .getSingleQuestion(req.body)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });

})

router.post('/create_question',middleware.verifyUser.verifyAccessToken,(req,res)=>{ 
  let validate = ajv.compile(createNewQuestionSchema);
    let valid = validate(req.body);
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
    contestadmin
      .createNewQuestion(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
})

router.get('/:contestId/questions',middleware.verifyUser.verifyAccessToken,(req,res)=>{
      req.body.contest_id=req.params.contestId;
      let validate = ajv.compile(getAllQuestionsSchema);
      let valid = validate(req.body);
      if (!valid) {
      return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
    contestadmin
      .getAllQuestions(req.body)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
})
router.post('/make_admin',middleware.verifyUser.verifyAccessToken,(req,res)=>{
  let validate = ajv.compile(editAdminSchema);
    let valid = validate(req.body);
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
    contestadmin
      .makeAdmin(req.body)
      .then((results)=>{

        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You are not an admin') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
})

router.post('/edit_admin',middleware.verifyUser.verifyAccessToken,(req,res)=>{
  let validate = ajv.compile(editAdminSchema);
    let valid = validate(req.body);
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
  constestadmin
    .editAdmin(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You cannot edit an admin') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });

});

router.post('/admin/delete',middleware.verifyUser.verifyAccessToken,(req,res)=>{
   let validate = ajv.compile(deleteAdminSchema);
    let valid = validate(req.body);
    if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
  constestadmin
    .deleteAdmin(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You cannot delete an admin') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });

});


router.get('/:contestId',middleware.verifyUser.verifyAccessToken,(req,res)=>{
  req.body.contest_id=req.params.contestId;
  let validate = ajv.compile(getSingleContestSchema);
    let valid = validate(req.body);
    if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
  constestadmin
    .getSingleContest(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });

});

router.post('/create',middleware.verifyUser.verifyAccessToken,(req,res)=>{
  let validate = ajv.compile(createNewContestSchema);
    let valid = validate(req.body);
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
    contestadmin
      .createNewContest(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You are not allowed to create a contest') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
  
});

router.post('/update', middleware.verifyUser.verifyAccessToken, (req, res) => {
  let validate = ajv.compile(editContestSchema);
    let valid = validate(req.body);
    if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
     if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
  constestadmin
    .editContest(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You are not an admin') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

router.post('/delete', middleware.verifyUser.verifyAccessToken, (req, res) => {
  let validate = ajv.compile(deleteContestSchema);
    let valid = validate(req.body);
    if (!valid) {
     return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
     });
    }
  constestadmin
    .deleteContest(req.body)
      .then((results)=>{
        return res.status(200).json({
          success:true,
          error:null,
          results
        });
      })
      .catch((error)=>{
        if (error === 'You are not an admin') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
          return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

router.get('/my_contests',middleware.verifyUser.verifyAccessToken,(req,res)=>{	
    contestadmin
      .getAllContests(req.body.username)
      .then((results) => {
        return res.status(200).json({
          success: true,
          error: null,
          results
        });
      })
      .catch((error) => {
        if (error === 'No contests') {
          return res.status(401).json({
            success: false,
            error,
            results: null,
          });
        }
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      });
});

module.exports=router;