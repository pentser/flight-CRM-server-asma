
const rawRepo=require('./data/raw-repo');
const validateData=require('./utils_deo').validateData;

   
const updateAirline=async (_id,_text,_country_id,_user_id) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_update_airlines('${_id}','${_text}','${_country_id}','${_user_id}')`);
        return result.rows[0].sp_update_airlines;

    } catch(e) {
        console.log(e.message);
    }
      
}

const insertFlight=async (_airline_id,_origin_country_id,_destination_country_id,_departure_time, _landing_time,_remaining_tickets) => {

    
    try {

     // validate data before running sp
     const val=validateData(_origin_country_id,_destination_country_id,_departure_time,_landing_time,_remaining_tickets);
     if(val.times && val.tickets && val.countrys) {
      const result=await rawRepo.getRowResult(`select * from sp_insert_flight('${_airline_id}','${_origin_country_id}','${_destination_country_id}','${_departure_time}','${_landing_time}','${_remaining_tickets}')`);
        return result.rows[0].sp_insert_flight;
     }
     else {
         return 0;
     }
    } catch(e) {

        console.log(e.message);
    }
}
   

 const deleteFlight=async (_id) => {

    try{
        
    const result=await rawRepo.getRowResult(`select * from sp_delete_flights('${_id}')`);
    return result.rows[0].sp_delete_flights;

    } catch(e) {
        console.log(e.message);
    }

} 


   const updateFlight=async (_id,_airline_id,_origin_country_id,_destination_country_id,_departure_time,_landing_time,_remaining_tickets) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_update_flights('${_id}','${_airline_id}','${_origin_country_id}','${_destination_country_id}','${_departure_time}','${_landing_time}','${_remaining_tickets}')`);
        return result.rows[0].sp_update_flights;

    } catch(e) {
        console.log(e.message);
    }

} 

const getAirlineByUser=async (_user) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from sp_get_airline_by_user('${_user}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}



module.exports={

    updateAirline,
    updateFlight,
    insertFlight,
    deleteFlight,
    getAirlineByUser
}

