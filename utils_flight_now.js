const { now } = require('mongoose');


const insert24hourNowFlights=async () => {


    // flights 
   const generator=require('./utils/nowUp24Hour');

   const Pool = require('pg').Pool
   const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: 'admin',
  port: 5432,
});

  for (let x=0,t=447;x<2;x++,t--) {

 let res=generator();
 let departure_time=res.departure_time;
  let landing_time=res.landing_time;
  let airline_id=1;
  let origin_country_id=Math.floor(Math.random()*2) +1;
  let destination_country_id=origin_country_id==2?1:2;
  let remaining_tickets=t;



const text = "SELECT * FROM sp_insert_flight($1,$2,$3,$4,$5,$6)"
const value = [airline_id,origin_country_id,destination_country_id,departure_time,landing_time,remaining_tickets];
await pool.query(text,value);
  }
  console.log(`add flights up to 24 hours from now: ${now()}`);


}

  





module.exports={
    insert24hourNowFlights,
  
}


