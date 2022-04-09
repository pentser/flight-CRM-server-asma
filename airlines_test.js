const assert = require('assert'); // for the testing capabilites
const expect = require('chai').expect; // for chai syntax 
const utils=require("./utils_deo");
const airlines=require("./airline_deo");


describe('airlines test suite',  function() {
    before(async function() {
      // runs once before the first test in this block
      // genertor_db seed for the db tables
      await utils.deleteDataTables();
      await utils.insertDataToTables();

      console.log('-----------------------------------------------');
      console.log('\ttest suite AIRLINES');
      console.log('-----------------------------------------------');
      

  });

    after(function() {
      // runs once after the last test in this block
    });
  
    beforeEach(function() {
      // runs before each test in this block
    });
  
    afterEach(function() {
      // runs after each test in this block
    });
  

     it('update airline' ,async () => {

      let input_update={
        id:1,
        name:'AL-AL Israel', 
        country_id:1,
        user_id:2,
      };
      let {id,name,country_id,user_id}=input_update;
      let res= await airlines.updateAirline(id,name,country_id,user_id)
      let actual_result=res;
      let expected_result='1';
      expect(actual_result).to.eql(expected_result);
    }); 

    it('update flight' ,async () => {

      let input_update={
          id:"1",
          airline_id:"1",
          origin_country_id:utils.origin_country_id_ar[0],
          destination_country_id:utils.destination_country_id_ar[0],
          departure_time:utils.departure_time_ar[0],
          landing_time:utils.landing_time_ar[0],
          remaining_tickets:448,
  
      };
      let {id,airline_id,origin_country_id,destination_country_id, departure_time,landing_time,remaining_tickets}=input_update;
      let res= await airlines.updateFlight(id,airline_id,origin_country_id,destination_country_id, departure_time.toISOString(),landing_time.toISOString(),remaining_tickets)
    
      let actual_result=res;
      let expected_result='1';
      expect(actual_result).to.eql(expected_result);
    }); 
  
   it('insert flight' ,async () => {
  
      let input_insert={
      
          airline_id:"1",
          origin_country_id:utils.origin_country_id_ar[0],
          destination_country_id:utils.destination_country_id_ar[0],
          departure_time:utils.departure_time_ar[0],
          landing_time:utils.landing_time_ar[0],
          remaining_tickets:447,
  
      };
      let {airline_id,origin_country_id,destination_country_id, departure_time,landing_time,remaining_tickets}=input_insert;
      let res= await airlines.insertFlight(airline_id,origin_country_id,destination_country_id, departure_time.toISOString(),landing_time.toISOString(),remaining_tickets)
      let actual_result=res;
      let expected_result="3";
      expect(actual_result).to.eql(expected_result);
    });
    
    // constrain
  /*   it('delete flight' ,async () => {

      let input_delete={
          id:"1",
          
      };
      let {id}=input_delete;
      let res= await airlines.deleteFlight(id)
      let actual_result=res;
      let expected_result='1';
      expect(actual_result).to.eql(expected_result);
    }); */ 

  });
