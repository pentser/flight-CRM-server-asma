const rawRepo=require('./data/raw-repo');


const utils=require('./utils_deo')


const getAllFlights=async () => {
   try {
    const result=await rawRepo.getRowResult(`select * from sp_get_all_flights()`);
    return result;
   } catch(e)
   {
       console.log(e.message)
   }
}

const getAllFlightsJoin=async () => {
    try {
     const result=await rawRepo.getRowResult(`select * from sp_get_all_flights_join()`);
     return result;
    } catch(e)
    {
        console.log(e.message)
    }
 }



const getAllCountries=async () => {
    try {
     const result=await rawRepo.getRowResult(`select * from sp_get_all_countries()`);
     return result;
    } catch(e)
    {
        console.log(e.message)
    }
 }




const getArrivalFlights=async (_id) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from get_arrival_flights ('${_id}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}

const getDepartureFlights=async (_id) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from get_departure_flights ('${_id}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
}
    
    
const getAllAirlinesJoin=async () => {
   
        try{
    
            const result=await rawRepo.getRowResult(`select * from sp_get_all_airlines_join()`);
            return result;
        } catch(e){
            console.log(e.message);
    
        }
        
}

const getAirlineById=async (_id) => {

    try {
        const result=await rawRepo.getRowResult
        (`select * from sp_get_airline_by_id('${_id}')`);
        return result;
    }

     catch(e) {
        console.log(e.message);
    }
}

const insertCustomer=async (_first_name,_last_name,_address,_phone_no, _user_id,_credit_card_no) => {

    try {
        const result=await rawRepo.getRowResult(`select * from sp_insert_customer('${_first_name}','${_last_name}','${_address}','${_phone_no}','${_user_id}','${_credit_card_no}')`);
        return result.rows[0].sp_insert_customer;
    } catch(e) {

        console.log(e.message);
    }
}

const getFlightById=async (_id) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from sp_get_flight_by_id('${_id}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}

const getFlightByAirlineId=async (_id) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from get_flight_by_airline_id('${_id}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}

const getFlightByParameters=async (_origin_country_id,_destination_country_id,_date) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from get_flights_by_parameters('${_origin_country_id}','${_destination_country_id}','${_date}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}

const checkUsernameAvailability=async (email) => {
    try{

        const result=await rawRepo.getRowResult(`select * from get_user_by_email('${email}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}




module.exports={
    getAllFlights,
    getAllFlightsJoin,
    getAllCountries,
    getArrivalFlights,
    getDepartureFlights,
    getAllAirlinesJoin,
    getAirlineById,
    insertCustomer,
    getFlightById,
    getFlightByAirlineId,
    getFlightByParameters,
    checkUsernameAvailability


   
}


