const airline_deo=require('../airline_deo');

const insertFlight= async (params)=>{
   const {airline_id,origin_country_id,destination_country_id,departure_time,landing_time
  ,remaining_tickets}=params;
   try{
      const res=await airline_deo.insertFlight(airline_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets);
      return res;

   }catch(e){
      console.log (e.message)
   }


}

const updateFlight= async (params)=>{
  const {id,airline_id,origin_country_id,destination_country_id,departure_time,landing_time
 ,remaining_tickets}=params;
  try{
     const res=await airline_deo.updateFlight(id,airline_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets);
     return res;

  }catch(e){
     console.log (e.message);
     return new Error('flight not exist');
  }


}

const deleteFlight=async (params)=>{
  const {id}=params
  try{
      const res=await airline_deo.deleteFlight(id);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error('flight not exist');

   }

}


 const updateAirline= async (params)=>{
    const {id,country_id,user_id}=params;
    try{
       const res=await airline_deo.updateAirline(id,country_id,user_id);
       return res;

    }catch(e){
       console.log (e.message);
       return new Error('airline not exist');
    }

}

const getAirlineByUser= async (params)=>{
   const {user}=params;
   try{
      const res=await admin_deo.getAirlineByUser(user);
      return res;
 
   }catch(e){
      console.log (e.message);
      return new Error('user not exist');
   }
 
 
 }


 module.exports={
    
    updateAirline,
    insertFlight,
    updateFlight,
    deleteFlight,
    getAirlineByUser
}







