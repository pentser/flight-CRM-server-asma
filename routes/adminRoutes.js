const { Router } = require('express');
const adminController = require('../controllers/adminController');
const clientActionController=require('../controllers/clientActionController');
const {requireAuth} =require('../middleware/authMiddleware');

const router = Router();


router.post('/insert_country',requireAuth,adminController.insert_country);
router.put('/update_country',requireAuth,adminController.update_country);
router.delete('/delete_country',requireAuth,adminController.delete_country);

router.post('/insert_airline',requireAuth,adminController.insert_airline);
router.put('/update_airline',requireAuth,adminController.update_airline);
router.delete('/delete_airline',requireAuth,adminController.delete_airline);


router.put('/update_customer',requireAuth,adminController.update_customer);
router.delete('/delete_customer',requireAuth,adminController.delete_customer);


/**
*  @swagger
*   /airlines/api/get_user_by_id?={id}:
*     get:
*       summary: Gets a user by id
*       tags: [airlines]
*       parameters:
*         - in: query
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The user id
*       responses:
*         "200":
*           description: Get The row data of the user.
*           content:
*             application/json:
*         "404":
*           description: user id not found.
*/
router.post('/get_user_by_id',requireAuth, adminController.get_user_by_id);
router.post('/get_admin_by_user', adminController.get_admin_by_user);

router.get('/get_all_users',requireAuth, adminController.get_all_users);
router.get('/get_all_customers', requireAuth,adminController.get_all_customers);
router.get('/get_all_tickets', requireAuth,adminController.get_all_tickets);
router.get('/get_all_tickets_join',requireAuth, adminController.get_all_tickets_join);


router.get('/get_all_trasactions',requireAuth,clientActionController.get_all_transactions);







/**
*  @swagger
*   /airlines/api/get_user_by_user?={user}:
*     get:
*       summary: Gets a user by user name
*       tags: [airlines]
*       parameters:
*         - in: query
*           name: user
*           schema:
*             type: string
*           required: true
*           description: The username
*       responses:
*         "200":
*           description: Get The row data of the current user.
*           content:
*             application/json:
*         "404":
*           description: user not found.
*/
router.post('/get_user_by_user',requireAuth, adminController.get_user_by_user);









module.exports = router;