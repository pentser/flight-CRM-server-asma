const assert = require('assert'); // for the testing capabilites
const expect = require('chai').expect; // for chai syntax 
const utils=require("./utils_deo");
const anonymous=require("./anonymous_deo");


describe('airlines test suite',  function() {
    before(async function() {
      // runs once before the first test in this block
      // genertor_db seed for the db tables
      await utils.deleteDataTables();
      await utils.insertDataToTables();


      console.log('-----------------------------------------------');
      console.log('\ttest suite ANONYMOUS');
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

    // constraint
/*      it('insert customer ', async ()=>{
      insert_input={
        first_name:'eli',
        last_name:'pentser',
        address:'hasmonaim 11,Ramat-Gan,Israel',
        phone_no:'+972 54-436-5678',
        user_id:'3',
        credit_card_no:'5800-5678-4448-4544'
      } 
    
      let {first_name,last_name,address,phone_no,user_id,credit_card_no}=insert_input
    
      
      const res=await anonymous.insertCustomer(first_name,last_name,address,phone_no,user_id,credit_card_no);
      let actual_result=res;
      let expected_result='2';
    
        expect(actual_result).to.eql(expected_result);
    
    }); 
 */

    it('get all flights:  ' ,async () => {
       
    
        let res= await anonymous.getAllFlights();
        let actual_result=res.rows;
        let expected_result=[
  
          {
              id:"1",
              airline_id:"1",
              origin_country_id:utils.origin_country_id_ar[0],
              destination_country_id:utils.destination_country_id_ar[0],
              departure_time:utils.departure_time_ar[0],
              landing_time:utils.landing_time_ar[0],
              remaining_tickets:449,

          },
          {
            id:"2",
            airline_id:"1",
            origin_country_id:utils.origin_country_id_ar[1],
            destination_country_id:utils.destination_country_id_ar[1],
            departure_time:utils.departure_time_ar[1],
            landing_time:utils.landing_time_ar[1],
            remaining_tickets:449
          }
        ]
       
        expect(actual_result).to.eql(expected_result);
      });
    it('get flight by id ' ,async () => {
       
    
        id="1"
        let res= await anonymous.getFlightById(id);
        let actual_result=res.rows;
        let expected_result=[
  
          {
              id:"1",
              airline_id:"1",
              origin_country_id:utils.origin_country_id_ar[0],
              destination_country_id:utils.destination_country_id_ar[0],
              departure_time:utils.departure_time_ar[0],
              landing_time:utils.landing_time_ar[0],
              remaining_tickets:449,
          }
        ]
       
        expect(actual_result).to.eql(expected_result);
      });
      //error
  /*    it('get flight by parameters ' ,async () => {
       
    
        const parametersInput={
          origin_country_id:1,
          destination_country_id:1,
          date: new Date('2021-10-07').toISOString()
        }

        let {origin_country_id,destination_country_id,date}=parametersInput

        let res= await anonymous.getFlightByParameters(origin_country_id,destination_country_id,date);
        let actual_result=res.rows;
        let expected_result=[
  
          {
              id:"2",
              airline_id:"1",
              origin_country_id:utils.origin_country_id_ar[0],
              destination_country_id:utils.destination_country_id_ar[0],
              departure_time:utils.departure_time_ar[0],
              landing_time:utils.landing_time_ar[0],
              remaining_tickets:449,
          }
        ]
       
        expect(actual_result).to.eql(expected_result);
      }); */

      it('get all countries:  ' ,async () => {
       
    
        let res= await anonymous.getAllCountries();
        let actual_result=res.rows;
        let expected_result=[
  
          {
              id:1,
              name:"ISRAEL"
          },
          {
            id:2,
            name:"ITALY"
          }
        ]
       
        expect(actual_result).to.eql(expected_result);
      });

      it('get all airlines (join):  ' ,async () => {
       
    
        let res= await anonymous.getAllAirlinesJoin()
        let actual_result=res.rows;
        let expected_result=[
  
          {
              id:"1",
              name:"AL-AL Israel",
              country:"ISRAEL",
              username:"angryduck156"
          },
         
        ]
       
        expect(actual_result).to.eql(expected_result);
      });

      it('get airline by id ' ,async () => {
       
    
        id="1"
        let res= await anonymous.getAirlineById(id);
        let actual_result=res.rows;
        let expected_result=[
  
          {
              id:"1",
              "name":"AL-AL Israel",
              "country_id":1,
              "user_id":"2"
              
          }
        ]
       
        expect(actual_result).to.eql(expected_result);
      }); 

      


     




  });


