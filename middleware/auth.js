const express=require('express');
const router=express.Router();


router.get('/',(req,res,next)=>{
    var randomNumber=Math.random().toString();
           randomNumber=randomNumber.substring(2,randomNumber.length);
           res.cookie('flightCRM',randomNumber, {httpOnly: true, sameSite:'None',secure:true, maxAge: 900000 })
           console.log('cookie have created successfully');
           res.send('hello');
           next();


});

module.exports=router;
