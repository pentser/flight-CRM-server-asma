const { Router } = require('express');
const customerController = require('../controllers/customerController');
const {requireAuth} =require('../middleware/authMiddleware')


const router = Router();

router.get('/',(req,res)=>{
    res.send('customer api page')
})

router.get('/get_customer_by_id', requireAuth,customerController.get_customer_by_id);

router.post('/get_customer_by_user',requireAuth,customerController.get_customer_by_user)

router.get('/get_ticket_by_customer', requireAuth,customerController.get_ticket_by_customer);

router.put('/update_customer',requireAuth,customerController.update_customer);

router.post('/insert_customer',customerController.insert_customer);

router.post('/insert_ticket',requireAuth,customerController.insert_ticket);

router.put('/update_ticket',requireAuth,customerController.update_ticket);

router.delete('/delete_ticket',requireAuth,customerController.delete_ticket);


/**
*  @swagger
*   /airlines/api/get_country_by_id?={id}:
*     get:
*       summary: Gets a country by id
*       tags: [airlines]
*       parameters:
*         - in: query
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The country id
*       responses:
*         "200":
*           description: Get The row data of the country.
*           content:
*             application/json:
*         "404":
*           description: country id not found.
*/
router.get('/get_country_by_id',requireAuth,customerController.get_country_by_id);





module.exports = router;