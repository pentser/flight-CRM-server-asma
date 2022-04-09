const { Router } = require('express');
const loginController = require('../controllers/loginController');



const router = Router();




router.post('/login',loginController.login_post);

router.get('/login',loginController.login_get);
  

router.get('/logout',loginController.logout_get);

router.get('/read-cookies', loginController.read_cookies);

router.get('/read-header',loginController.read_header);

  module.exports=router;
    