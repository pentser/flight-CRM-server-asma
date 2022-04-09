const rawRepo=require('./data/raw-repo');
// custom module to generate departure and landing time



let userCustomerId;
let userAsAirlineId;

// for stored random dates,origin and destination id, for next tests
 let departure_time_ar=[];
 let landing_time_ar=[];
 let origin_country_id_ar=[];
 let destination_country_id_ar=[];

const deleteDataTables= async () => {

    const result1=await rawRepo.getRowResult(`call sp_delete_and_reset_tickets()`);
    console.log('delete tickets table...');
    const result2=await rawRepo.getRowResult(`call sp_delete_and_reset_flights()`);
    console.log('delete flights table...');
    const result3=await rawRepo.getRowResult(`call sp_delete_and_reset_airlines()`);
    console.log('delete airlines table...');
    const result4=await rawRepo.getRowResult(`call sp_delete_and_reset_customers()`);
    console.log('delete customers table...');
    const result5=await rawRepo.getRowResult(`call sp_delete_and_reset_users()`);
    console.log('delete users table...');
    const result6=await rawRepo.getRowResult(`call sp_delete_and_reset_countries()`);
    console.log('delete countries table...');
    

}

const insertDataToTables=async () => {

    // countries
    const country1=await rawRepo.getRowResult(`SELECT * FROM sp_insert_country('ISRAEL')`);
    const country2=await rawRepo.getRowResult(`SELECT * FROM sp_insert_country('ITALY')`);
    console.log('countries:',country1.rows,country2.rows);

    //users
    const user1=await rawRepo.getRowResult(`SELECT * FROM sp_insert_users('angryostrich988','r2d2','louane.vidal@example.com','Customer')`);
    const user2=await rawRepo.getRowResult(`SELECT * FROM sp_insert_users('angryduck156','0101','don.white@example.com','Airline')`);
    console.log('results:',user1.rows,user2.rows);
    userCustomerId=user1.rows[0].sp_insert_users;
    userAsAirlineId=user2.rows[0].sp_insert_users;


      //customers
      const customer1=await rawRepo.getRowResult(`SELECT * FROM sp_insert_customer('Wilber','Bins','Stromanmouth,743 Bruno Pike,United States','+258 162-022-9524 x4366',${userCustomerId},'6771-8966-9009-2882')`);
    
      console.log('customers:',customer1.rows);

       // airlines
    const airline1=await rawRepo.getRowResult(`SELECT * FROM sp_insert_airline('AL-AL Israel',1,${userAsAirlineId})`);
  
    console.log('airlines:',airline1.rows);


    // flights 


   const generator=require('./utils/date');

   const Pool = require('pg').Pool
   const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: 'admin',
  port: 5432,
});

  for (let x=0;x<2;x++) {

 let res=generator();
 let departure_time=res.departure_time;
  let landing_time=res.landing_time;
  let airline_id=1;
  let origin_country_id=Math.floor(Math.random()*2) +1;
  let destination_country_id=origin_country_id==2?1:2;
  let remaining_tickets=449;

  // keep random dayes on array for letter test on this mudule
  departure_time_ar.push(departure_time);
  landing_time_ar.push(landing_time);
  origin_country_id_ar.push(origin_country_id);
  destination_country_id_ar.push(destination_country_id);
  


const text = "SELECT * FROM sp_insert_flight($1,$2,$3,$4,$5,$6)"
const value = [airline_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets];
await pool.query(text,value);
  }
  console.log('add flights');


 // tickets
const tikets=await rawRepo.getRowResult(`SELECT * FROM  sp_insert_ticket(1,1)`);
console.log('tickets:',tikets.rows);

}

    
   /*    const flight1=await rawRepo.getRowResult(`SELECT * FROM sp_insert_flights(1,1,2,${generator.departure_time},${generator.landing_time},449)`);
    console.log('flights:',flight1);   */

    
    
  
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






module.exports={
    deleteDataTables,
    insertDataToTables,
    validateData,
    departure_time_ar,
    landing_time_ar,
    origin_country_id_ar,
    destination_country_id_ar 
  
}


