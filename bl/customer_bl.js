
const customer_deo=require('../customer_deo');

const getCustomerById=async (params)=>{
   const {id}=params
   try {
    const res=await customer_deo.getCustomerById(id)
    return res.rows[0];
   }catch(e){
       console.log (e.message);
       return new Error('id not exists');

   }
}

const getCustomerByUser=async (params)=>{
    const {username}=params;
    try {
     const res=await customer_deo.getCustomerByUser(username);
     return res.rows[0];
    }catch(e){
        console.log (e.message);
        return new Error('user not exists');
 
    }
 }

 const getFlightById=async (params)=>{
     const {id}=params
    try {
     const res=await customer_deo.getFlightById(id)
     return res.rows[0];
    }catch(e){
        console.log (e.message);
        return new Error('id not exists');
 
    }
 }

 const getCountryById=async (params)=>{
     const{id}=params;
    try {
     const res=await customer_deo.getCountryById(id)
     return res.rows[0];
    }catch(e){
        console.log (e.message);
        return new Error('id not exists');
 
    }
 }

 const getTicketById=async (params)=>{
     const {id}=params;
    try {
     const res=await customer_deo.getTicketById(id)
     return res.rows[0];
    }catch(e){
        console.log (e.message);
        return new Error('id not exists');
 
    }
 }


 
const getTicketByCustomer=async (params)=>{
    const {customer}=params
    try {
     const res=await customer_deo.getTicketByCustomer(customer);
     return res.rows[0];
    }catch(e){
        console.log (e.message);
        return new Error('customer not exists');
 
    }
 }


 const insertFlight= async (params)=>{
     const {airline_id,origin_country_id,destination_country_id,departure_time,landing_time
    ,remaining_tickets}=params;
     try{
        const res=await customer_deo.insertFlight(airline_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets);
        return res;

     }catch(e){
        console.log (e.message);
        return new Error(e.message);
     }


 }

 const updateFlight= async (params)=>{
    const {id,airline_id,origin_country_id,destination_country_id,departure_time,landing_time
   ,remaining_tickets}=params;
    try{
       const res=await customer_deo.updateFlight(id,airline_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets);
       return res;

    }catch(e){
       console.log (e.message);
       return new Error('flight not exists');

    }


}

const insertTicket= async (params)=>{
    const {flight_id,customer_id}=params;
    try{
       const res=await customer_deo.insertTicket(flight_id,customer_id);
       return res;

    }catch(e){
       console.log (e.message);
       return new Error(e.message);
    }


}

const updateTicket= async (params)=>{
   const {id,airline_id,customer_id}=params;
   try{
      const res=await customer_deo.updateTicket(id,airline_id,customer_id);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error('ticket not exists');

   }


}


const updateCustomer= async (params)=>{
    const {id,first_name,last_name,address,phone_no,user_id,credit_card_no}=params;
    try{
       const res=await customer_deo.updateCustomers(id,first_name,last_name,address,phone_no,user_id,credit_card_no);
      
       return res;

    }catch(e){
       console.log (e.message);
       return new Error('customer not exists');
    }


}


const insertCustomer= async (params)=>{
   const {first_name,last_name,address,phone_no,user_id,credit_card_no}=params;
   try{
      const res=await customer_deo.insertCustomers(first_name,last_name,address,phone_no,user_id,credit_card_no);
     
      return res;

   }catch(e){
      console.log (e.message);
      return new Error('the customer not added to the table');
   }


}













module.exports={
    getCustomerById,
    getCustomerByUser,
    getFlightById,
    getCountryById,
    getTicketById,
    getTicketByCustomer,
    insertFlight,
    updateFlight,
    updateCustomer,
    insertCustomer,
    insertTicket,
    updateTicket
  

}

