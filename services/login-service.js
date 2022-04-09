const bl=require('../bl/admin_bl');
 const jwt=require('jsonwebtoken');
 const config=require('config');




const tryLogin = async (params)=> {

    let token=null;
    let userData=null;
    //let typeOfUser={};
   try {
    const res=await bl.getUserByUser(params);

    const user=res.rows[0];
     // if user exist
    if(user) {
         // if password are equal
        if(user.password===params.password) {

             
           userData=user;
           token=createToken(user.id);
           
        }
        else {
            throw Error("incorrect password")
        }
    }
    else {
      
        throw Error("incorrect user")
    }

    return {userData,token};

} catch(e) {
    throw Error(e);
}
}

const trySignup = async (params)=> {

   
    let token=null;
    let userData=null;
  
   try {
    const res=await bl.getUserByUser(params);

    const user=res.rows[0];
     // if user exist
    if(user) {
         // if user exists
            throw Error("user exist")    
    }
    else {
        // create user
        const res=await bl.insertUser(params);
        if(res) {
            const res=await bl.getUserByUser(params);
            const user=res.rows[0];
            token=createToken(user.id);
            userData=user;
        }
        else{
            throw Error("Error insertUser")    
        }
    }

    return {token,userData};

} catch(e) {
    throw Error(e);
}
}



 const createToken = (id) => {
  return jwt.sign({id}, config.get('privateKey'), 
    {expiresIn: config.get('ttl')}
  );
}; 




module.exports={
    tryLogin,
    trySignup
}