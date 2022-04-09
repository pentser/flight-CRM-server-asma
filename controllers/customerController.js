const bl= require('../bl/customer_bl');
const {trx_keeper}=require('../utils/transactionKeeper');
const logger=require('../utils/logger');




// controller actions
get_customer_by_id = async (req, res) => {
    
    try {
        
        params=req.query;
        const paramsAr=Object.values(params)
        const action= await trx_keeper(req.url,'getCustomerById', paramsAr);
        if(action) {
          result=await bl.getCustomerById(params);
          if(result instanceof Error) {  
            res.status(500).json(result.message)
         }
          res.status(200).json(result);

        }
      
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_customer_by_id:,${e}`
  });
    }
    
  }

  get_country_by_id = async (req, res) => {
    
    try {
        
        params=req.query;
        const paramsAr=Object.values(params)
        const action= await trx_keeper(req.url,'getCountryById', paramsAr);
        if(action) {
          result=await bl.getCountryById(params);
          if(result instanceof Error) {  
            res.status(500).json(result.message)
         }
          res.status(200).json(result);

        }
      
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_country_by_id:,${e}`
  });
    }
    
  }




  get_ticket_by_customer = async (req, res) => {
    
    try {
        params=req.query;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'getTicketByCustomer',paramsAr);
        result=await bl.getTicketByCustomer(params)
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_ticket_by_customer:,${e}`
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

  insert_ticket = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'insertTicket',paramsAr);
        result=await bl.insertTicket(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  insert_ticket:,${e}`
  });
    }
    
  }

  update_ticket = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'updateTicket',paramsAr);
        result=await bl.updateTicket(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  update_ticket:,${e}`
  });
    }
    
  }

  delete_ticket = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'deleteTicket',paramsAr);
        result=await bl.deleteTicket(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  delete_ticket:,${e}`
  });
    }
    
  }


  get_customer_by_user = async (req, res) => {
    
    try {
        params=req.body;
        const paramsAr=Object.values(params)
        await trx_keeper(req.url,'getCustomerByUser',paramsAr);
        result=await bl.getCustomerByUser(params);
        if(result instanceof Error) {  
          res.status(500).json(result.message)
       }
        res.status(200).json(result);
      
    }catch(e) {
     console.log(e);
     logger.log({
      level: 'error',
     message: `error  get_customer_by_user:,${e}`
  });
    }
    
  }









  

  module.exports={
    get_customer_by_id,
    get_ticket_by_customer,
    update_customer,
    insert_customer,
    get_customer_by_user,
    delete_ticket,
    update_ticket,
    insert_ticket,
    get_country_by_id


  }



