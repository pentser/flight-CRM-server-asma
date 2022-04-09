const bl= require('../bl/admin_bl');
const {trx_keeper}=require('../utils/transactionKeeper');
const logger=require('../utils/logger');




// controller actions

insert_country = async (req, res) => {
    
  try {
      params=req.body;
      const paramsAr=Object.values(params)
      await trx_keeper(req.url,'insertCountry',paramsAr);
      result=await bl.insertCountry(params);
      if(result instanceof Error) {  
        res.status(500).json(result.message)
     }
      res.status(200).json(result);
    
  }catch(e) {
   console.log(e);
   logger.log({
    level: 'error',
   message: `error  insert_country:,${e}`
});
  }
  
}

update_country = async (req, res) => {
  
  try {
      params=req.body;
      const paramsAr=Object.values(params)
      await trx_keeper(req.url,'updateCountry',paramsAr);
      result=await bl.updateCountry(params);
      if(result instanceof Error) {  
        res.status(500).json(result.message)
     }
      res.status(200).json(result);
    
  }catch(e) {
   console.log(e);
   logger.log({
    level: 'error',
   message: `error  update_country:,${e}`
});
  }
  
}

delete_country = async (req, res) => {
  
  try {
      params=req.body;
      const paramsAr=Object.values(params)
      await trx_keeper(req.url,'deleteCountry',paramsAr);
      result=await bl.deleteCountry(params);
      
      if(result instanceof Error) {  
         res.status(500).json(result.message)
      }
       res.status(200).json(result);
    
  }catch(e) {
   logger.log({
    level: 'error',
   message: `error  delete_country:,${e}`
});
  }
  
}

  
  insert_airline = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'insertAirline',paramsAr);
        result=await bl.insertAirline(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  insert_airline:,${e}`
  });
    }
    
  }

  update_airline = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'updateAirline',paramsAr);
        result=await bl.updateAirline(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  update_airline:,${e}`
  });
    }
    
  }

  delete_airline = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'deleteAirline',paramsAr);
        result=await bl.deleteAirline(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  delete_airline:,${e}`
  });
    }
    
  }

  insert_user = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'insertUser',paramsAr);
        result=await bl.insertUser(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  insert_user:,${e}`
  });
    }
    
  }

  update_user = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'updateUser',paramsAr);
        result=await bl.updateUser(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  update_user:,${e}`
  });
    }
    
  }

  delete_user = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'deleteUser',paramsAr);
        result=await bl.deleteUser(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e)
    }
    
  }

  insert_customer = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'insertCustomer',paramsAr);
        result=await bl.insertCustomer(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  insert_customer:,${e}`
  });
    }
    
  }

  update_customer = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'updateCustomer',paramsAr);
        result=await bl.updateCustomer(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  update_customer:,${e}`
  });
    }
    
  }

  delete_customer = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'deleteCustomer',paramsAr);
        result=await bl.deleteCustomer(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  delete_customer:,${e}`
  });
    }
    
  }

  get_all_users = async (req, res) => {
    
    try {
        
        const paramsAr=[];
        const action= await trx_keeper(req.url,'getAllUsers', paramsAr);
        if(action) {
          result=await bl.getAllUsers();
          if(result instanceof Error) {  
            res.status(500).json(result.message)
         }
          res.status(200).json(result);

        }
      
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_all_users:,${e}`
  });
    }
    
  }

  get_all_customers = async (req, res) => {
    
    try {
        
        const paramsAr=[];
        const action= await trx_keeper(req.url,'getAllCustomers', paramsAr);
        if(action) {
          result=await bl.getAllCustomers();
          if(result instanceof Error) {  
            res.status(500).json(result.message)
         }
          res.status(200).json(result);

        }
      
      
    }catch(e) {
     console.log(e)
    }
    
  }

  get_all_tickets = async (req, res) => {
    
    try {
        
        const paramsAr=[];
        const action= await trx_keeper(req.url,'getAllTickets', paramsAr);
        if(action) {
          result=await bl.getAllTickets();
          if(result instanceof Error) {  
            res.status(500).json(result.message)
         }
          res.status(200).json(result);

        }
      
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_all_tickets:,${e}`
  });
    }
    
  }

  get_all_tickets_join = async (req, res) => {
    
    try {
        
        const paramsAr=[];
        const action= await trx_keeper(req.url,'getAllTicketsJoin', paramsAr);
        if(action) {
          result=await bl.getAllTicketsJoin();
          if(result instanceof Error) {  
            res.status(500).json(result.message)
         }
          res.status(200).json(result);

        }
      
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_all_tickets_join:,${e}`
  });
    }
    
  }

  get_user_by_id = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'getUserById',paramsAr);
        result=await bl.getUserById(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_user_by_id:,${e}`
  });
    }
    
  }

  
  get_admin_by_user = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'getAdminByUser',paramsAr);
        result=await bl.getAdminByUser(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_admin_by_user:,${e}`
  });
    }
    
  }

  get_user_by_user = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'getUserByUser',paramsAr);
        result=await bl.getUserByUser(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_user_by_user:,${e}`
  });
    }
    
  }



  

  module.exports={

    insert_country,
    update_country,
    delete_country,

    insert_user,
    update_user,
    delete_user,

    insert_airline,
    update_airline,
    delete_airline,

    insert_customer,
    update_customer,
    delete_customer,

    get_all_users,
    get_all_customers,
    get_all_tickets,
    get_all_tickets_join,
    get_user_by_id,
    get_admin_by_user,
    get_user_by_user

  }



