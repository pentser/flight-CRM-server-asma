const { Router } = require('express');
const anonymousController = require('../controllers/anonymousController');
const {requireAuth} =require('../middleware/authMiddleware')

const router = Router();

router.get('/get_all_countries', requireAuth,anonymousController.get_all_countries);
router.get('/get_all_flights', requireAuth,anonymousController.get_all_flights);
router.get('/get_all_flights_join',requireAuth, anonymousController.get_all_flights_join);
router.get('/get_arrival_flights',requireAuth, anonymousController.get_arrival_flights);
router.get('/get_departure_flights', requireAuth,anonymousController.get_departure_flights);
/**
*  @swagger
*	/airlines/api/get_all_airlines_join?={id}:
*     get:
*       summary: Lists all the airlines with join
*       tags: [airlines]
*       responses:
*         "200":
*           description: The list of airlines.
*           content:
*             application/json:           
*/
router.get('/get_all_airlines_join',requireAuth, anonymousController.get_all_airlines_join);
router.get('/get_flight_by_id',requireAuth, anonymousController.get_flight_by_id);
router.get('/get_flight_by_airline_id',requireAuth, anonymousController.get_flight_by_airline_id);

router.get('/get_flights_by_parameters',requireAuth, anonymousController.get_flights_by_parameters);





module.exports=router;