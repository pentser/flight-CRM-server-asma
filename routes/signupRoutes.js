const { Router } = require('express');
const signUpController = require('../controllers/signupController');

const router = Router();


router.post('/signup',signUpController.signup_post);
  


  module.exports=router;
    