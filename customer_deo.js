
const rawRepo=require('./data/raw-repo');




const updateCustomers=async (_id,_first_name,_last_name,_address,_phone_no,_user_id,_credit_card_no) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_update_customers('${_id}',
        '${_first_name}','${_last_name}','${_address}','${_phone_no}','${_user_id}','${_credit_card_no}')`);
        return result.rows[0].sp_update_customers;

    } catch(e) {
        console.log(e.message);
    }

}

const insertCustomers=async (_first_name,_last_name,_address,_phone_no,_user_id,_credit_card_no) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_insert_customer(
        '${_first_name}','${_last_name}','${_address}','${_phone_no}','${_user_id}','${_credit_card_no}')`);
        return result.rows[0].sp_insert_customer;

    } catch(e) {
        console.log(e.message);
    }

}

const getCustomerById=async (_id) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_get_customer_by_id('${_id}')`);
        return result;

    } catch(e) {
        console.log(e.message);
    }

}

const getCountryById=async (_id) => {

    try {

        const result=await rawRepo.getRowResult(`select * from sp_get_country_by_id('${_id}')`);
        return result;

    } catch(e) {
        console.log(e.message);
    }

}



const getTicketByCustomer=async (_customer) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from get_tickets_by_customer(${_customer})`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}

const deleteTicket=async (_id) => {

    try{
        
    const result=await rawRepo.getRowResult(`select * from sp_delete_ticket('${_id}')`);
    return result.rows[0].sp_delete_ticket;

    } catch(e) {
        console.log(e.message);
    }

} 

const insertTicket=async (_flight_id,_customer_id) => {

    try {
        const result=await rawRepo.getRowResult(`select * from sp_insert_ticket('${_flight_id}','${_customer_id}')`);
        return result.rows[0].sp_insert_ticket;
    } catch(e) {

        console.log(e.message);
    }
}

const updateTicket=async (_id,_flight_id,_customer_id) => {

    try {
        const result=await rawRepo.getRowResult(`select * from sp_update_tickets('${_id}','${_flight_id}','${_customer_id}')`);
        return result.rows[0].sp_update_tickets;
    } catch(e) {

        console.log(e.message);
    }
}

const getCustomerByUser=async (_user) => {
   
    try{

        const result=await rawRepo.getRowResult(`select * from sp_get_customer_by_user('${_user}')`);
        return result;
    } catch(e){
        console.log(e.message);

    }
    
}








module.exports={
  
    updateCustomers,
    insertCustomers,
    getCustomerById,
    getTicketByCustomer,
    deleteTicket,
    insertTicket,
    updateTicket,
    getCustomerByUser,
    getCountryById,


  
}