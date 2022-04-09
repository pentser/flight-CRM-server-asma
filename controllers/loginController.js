const {trx_keeper}=require('../utils/transactionKeeper');
const config=require('config');
const {tryLogin} =require('../services/login-service');
const logger=require('../utils/logger');





login_post = async (req,res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'login',paramsAr);
        let {userData,token}=await tryLogin(params);
         if(token) {

          res.cookie('jwt', token, {httpOnly: true, sameSite:'None',secure:true, maxAge: config.get('ttl')*1000 });
          res.cookie('user',{username,email,rule}=userData,{httpOnly: true,sameSite:'None', secure:true,maxAge: config.get('ttl')*1000 });
          res.status(200).json({ token,username,email,rule});
        
        }
        else{
   
          res.status(400).json({err:"invalid login"})
        }
       
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: ` login_post:,${e}`
  });
    }
  }

login_get = async (req, res) => {
   try{

    res.json('login-get');
   }
   catch(e) {
     console.log(e)
   }
  
  }


logout_get= async (req,res) =>{

  
  res.cookie('jwt', '', { maxAge: 1,httpOnly: true, sameSite:'None',secure:true });
  res.cookie('user', '', { maxAge: 1,httpOnly: true, sameSite:'None',secure:true }); 

  res.status(200).json({complate:'Done'});

}

read_cookies= async (req, res) => {
 
  console.log(req.url)
  console.log(req.cookies);
  return res.json({ cookies:req.cookies });


};

read_header=async (req, res) => {
  // jwt from header
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];
      const jwt = require('jsonwebtoken');
      jwt.verify(token,config.get('privateKey'), (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          return res.json({token:user})
      });
  }
  else { 
    return res.sendStatus(403);
  }
}; 







module.exports={
    login_post,
    logout_get,
    read_cookies,
    read_header,
    login_get
  
}



