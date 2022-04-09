

const rawRepo=require('./data/raw-repo');

// validateData Helper function
// 1- validate number of tickets
// 2- validate landing time after departure
// 3- validate diffrent origin destination country

const validateData=(origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets)=>{
    let valObj={
        tickets:true,
        times:true,
        countrys:true
    };
    departure_time=new Date(departure_time).getTime();
    landing_time=new Date(landing_time).getTime();

    if(remaining_tickets==0)
       valObj.tickets=false;
    if(landing_time-departure_time<=0)
       valObj.times=false;
    if(origin_country_id==destination_country_id)
      valObj.countrys=false;
    
   return valObj;
      

}


// country table

const insertCountry=async (_name) => {

    try {
        const result=await rawRepo.getRowResult(`select * from sp_insert_country('${_name}')`);
        return result.rows[0].sp_insert_country;
    } catch(e) {

        console.log(e.message);
    }
}
   

const deleteCountry=async (_id) => {

    try{
        
    const result=await rawRepo.getRowResult(`select * from sp_delete_countries('${_id}')`);
    return result.rows[0].sp_delete_countries;

    } catch(e) {
        console.log(e.message);
    }

}


const updateCountry=async (_id,_text) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_update_countries('${_id}','${_text}')`);
        return result.rows[0].sp_update_countries;

    } catch(e) {
        console.log(e.message);
    }
      

}



//-------------------------------------------------------------------------------------------------
// users table


const insertUser=async (_username,_password,_email,_rule) => {

    try {
        const result=await rawRepo.getRowResult(`select * from sp_insert_users('${_username}','${_password}','${_email}','${_rule}')`);
        return result.rows[0].sp_insert_users;
    } catch(e) {

        console.log(e.message);
    }
}
   


const deleteUser=async (_id) => {

    try{
        
    const result=await rawRepo.getRowResult(`select * from sp_delete_user('${_id}')`);
    return result.rows[0].sp_delete_user;

    } catch(e) {
        throw e
    }

}

const updateUser=async (_id,_username,_password,_email,_rule) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_update_user('${_id}','${_username}','${_password}','${_email}','${_rule}')`);
        return result.rows[0].sp_update_user;

    } catch(e) {
        console.log(e.message);
    }

}




//-------------------------------------------------------------------------------------------------
// airlines table


const insertAirline=async (_name,_country_id,_user_id) => {

    try {
        const result=await rawRepo.getRowResult(`select * from sp_insert_airline('${_name}','${_country_id}','${_user_id}')`);
        return result.rows[0].sp_insert_airline;
    } catch(e) {

        console.log(e.message);
    }
}
   


const deleteAirline=async (_id) => {

    try{
        
    const result=await rawRepo.getRowResult(`select * from sp_delete_airline('${_id}')`);
    return result.rows[0].sp_delete_airline;

    } catch(e) {
        console.log(e.message);
    }

}

const updateAirline=async (_id,_name,_country_id,_user_id) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_update_airlines('${_id}','${_name}','${_country_id}','${_user_id}')`);
        return result.rows[0].sp_update_airlines;

    } catch(e) {
        console.log(e.message);
    }
      


}



//-------------------------------------------------------------------------------------------------


// customers table


const deleteCustomer=async (_id) => {

    try{
        
    const result=await rawRepo.getRowResult(`select * from sp_delete_customers('${_id}')`);
    return result.rows[0].sp_delete_customers;

    } catch(e) {
        console.log(e.message);
    }

}


const updateCustomer=async (_id,_first_name,_last_name,_address,_phone_no,_user_id,_credit_card_no) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_update_customers('${_id}','${_first_name}','${_last_name}','${_address}','${_phone_no}','${_user_id}','${_credit_card_no}')`);
        return result.rows[0].sp_update_customers;

    } catch(e) {
        console.log(e.message);
    }

}

const getAllUsers=async () => {
    try {
     const result=await rawRepo.getRowResult(`select * from sp_get_all_users()`);
     return result;
    } catch(e)
    {
        console.log(e.message)
    }
 }

 const getAllCustomers=async () => {
    try {
     const result=await rawRepo.getRowResult(`select * from sp_get_all_customers()`);
     return result;
    } catch(e)
    {
        console.log(e.message)
    }
 }

 const getAllTickets=async () => {
    try {
     const result=await rawRepo.getRowResult(`select * from sp_get_all_tickets()`);
     return result;
    } catch(e)
    {
        console.log(e.message)
    }
 }

 const getAllTicketsJoin=async () => {
    try {
     const result=await rawRepo.getRowResult(`select * from sp_get_all_tickets_join()`);
     return result;
    } catch(e)
    {
        console.log(e.message)
    }
 }

 const getUserById=async (_id) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from sp_get_user_by_id('${_id}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}

const getAdminByUser=async (_user) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from sp_get_user_by_user('${_user}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}

   
const getUserByUser=async (_user_name) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_get_user_by_username('${_user_name}')`);
        return result;
     

    } catch(e) {
        console.log(e.message);
    }
      
}

const trz=require('./utils/transactionKeeper');

const getAllTransactions=async () => {
    try {
     const result=await trz.get_all_transactions();
     return result;
    } catch(e)
    {
        console.log(e.message)
    }
 }




//

   const Pool = require('pg').Pool
   const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: 'admin',
  port: 5432,
});






 


module.exports={

    insertCountry,
    deleteCountry,
    updateCountry,

    insertUser,
    updateUser,
    deleteUser,

    insertAirline,
    deleteAirline,
    updateAirline,

    deleteCustomer,
    updateCustomer,

    getAllUsers,
    getAllTickets,
    getAllTicketsJoin,
    getAllCustomers,
    getUserById,
    getUserByUser,
    getAdminByUser,

    getAllTransactions

}





