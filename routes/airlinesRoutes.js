const { Router } = require('express');
const airlineController = require('../controllers/airlineController');
const clientActionController=require('../controllers/clientActionController')
const {requireAuth} =require('../middleware/authMiddleware');

const router = Router();


/**
*  @swagger
*  components:
*     schemas:
*       airlines:
*         type: object
*         required:
*           - mame
*           - country_id
*           - user_id
*         properties:
*           id:
*             type: bigint
*             description: The auto-generated id of the airlines.
*           name:
*             type: string
*             description: The name of the airline.
*           country_id:
*             type: integer
*             description: id of the country
*           user_id:
*             type: bigint
*             description: id of the user
*         example:
*            name: ElAl airplan
*            country_id: 1
*            user_id: 1
*/

/**
*  @swagger
*  tags:
*    name: Airlines
*    description: API to manage airlines companies.
*/


/**
*  @swagger
*   /airline/airlines:
*     put:
*       summary: update airline
*       tags: [airline]
*       requestBody: 
*           required: true 
*           content: 
*               application/json:                
*       responses:
*         "200":
*           description: Get The row data of the country.
*           content:
*             application/json:
*         "404":
*           description: country id not found.
*/

router.put('/update_airline',requireAuth,airlineController.update_airline);


router.post('/insert_flight',requireAuth,airlineController.insert_flight);

router.put('/update_flight',requireAuth,airlineController.update_flight);

router.delete('/delete_flight',requireAuth,airlineController.delete_flight);


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
router.get('/get_airline_by_user', requireAuth,airlineController.get_airline_by_user);





module.exports=router;



