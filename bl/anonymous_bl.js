
const anonymous_deo=require('../anonymous_deo');

const  getAllCountries=async ()=>{

   try {
    const res=await anonymous_deo.getAllCountries();
    return res.rows;
   }catch(e){
       console.log (e.message);
       return new Error(e.message);

   }
}

const  getAllFlights=async ()=>{

    try {
     const res=await anonymous_deo.getAllFlights();
     return res.rows;
    }catch(e){
        console.log (e.message);
        return new Error(e.message);
 
    }
 }

 const  getAllFlightsJoin=async ()=>{

    try {
     const res=await anonymous_deo.getAllFlightsJoin();
     return res.rows;
    }catch(e){
        console.log (e.message);
        return new Error(e.message);
 
    }
 }

 const  getArrivalFlights=async (params)=>{
    const {id}=params
    try {
     const res=await anonymous_deo.getArrivalFlights(id);
     return res.rows;
    }catch(e){
        console.log (e.message);
        return new Error(e.message);
 
    }
 }

 const  getDepartureFlights=async (params)=>{
    const {id}=params
    try {
     const res=await anonymous_deo.getDepartureFlights(id);
     return res.rows;
    }catch(e){
        console.log (e.message);
        return new Error(e.message);
 
    }
 }

 const  getAllAirlinesJoin=async ()=>{

    try {
     const res=await anonymous_deo.getAllAirlinesJoin();
     return res.rows;
    }catch(e){
        console.log (e.message);
        return new Error(e.message);
 
    }
 }

 const getFlightById=async (params)=>{
    const {id}=params
   try {
    const res=await anonymous_deo.getFlightById(id)
    return res.rows[0];
   }catch(e){
       console.log (e.message)
       return new Error('id not exist');

   }
}

const getAirlineById=async (params)=>{
    const {id}=params
   try {
    const res=await anonymous_deo.AirlineById(id)
    return res.rows[0];
   }catch(e){
       console.log (e.message);
       return new Error('id not exist');

   }
}

const getFlightByAirlineId=async (params)=>{
    const {id}=params
   try {
    const res=await anonymous_deo.getFlightByAirlineId(id)
    return res.rows[0];
   }catch(e){
       console.log (e.message);
       return new Error('id not exist');

   }
}

const getFlightByParameters=async (params)=>{
    const {origin_country_id,destination_country_id,date}=params
   try {
    const res=await anonymous_deo.getFlightByParameters(origin_country_id,destination_country_id,date)
    return res.rows[0];
   }catch(e){
       console.log (e.message)
       return new Error(e,message);

   }
}

const checkUsernameAvailability=  async (params)=>{
        const {username}=params
       try {
        const res=await anonymous_deo.checkUsernameAvailability(username)
        return res.rows[0];
       }catch(e){
           console.log (e.message);
           return new Error(e.message);
    
       }
}

 

module.exports={
    getAllCountries,
    getAllFlights,
    getAllFlightsJoin,
    getArrivalFlights,
    getDepartureFlights,
    getAllAirlinesJoin,
    getFlightById,
    getFlightByAirlineId,
    getFlightByParameters,
    checkUsernameAvailability,
    getAirlineById

}