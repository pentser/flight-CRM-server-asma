const {trx_keeper}=require('../utils/transactionKeeper');
const logger=require('../utils/logger');
const { trySignup } = require('../services/login-service');
const config=require('config');





signup_post = async (req,res) => {
    
  try {
      params=req.body;
      const paramsAr=Object.values(params)
      await trx_keeper(req.url,'signup',paramsAr);
      let {userData,token}=await trySignup(params);
       if(token) {
        res.cookie('jwt', token, {httpOnly: true, sameSite:'None',secure:true, maxAge: config.get('ttl')*1000 });
          res.cookie('user',{username,email,rule}=userData,{httpOnly: true,sameSite:'None', secure:true,maxAge: config.get('ttl')*1000 });
        res.status(200).json({ token,username,email,rule});
      }
      else{
 
        res.status(400).json({err:"invalid signup"})
      }
     
    
  }catch(e) {
   console.log(e);
   logger.log({
    level: 'error',
   message: `error  signup_post:,${e}`
});
  }
}



module.exports={

    signup_post

  
}



