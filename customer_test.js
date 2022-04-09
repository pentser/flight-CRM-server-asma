const assert = require('assert'); // for the testing capabilites
const expect = require('chai').expect; // for chai syntax 
const utils=require("./utils_deo");
const customers=require("./customer_deo");

describe('customers test suite',  function() {
    before(async function() {
      // runs once before the first test in this block
      // genertor_db seed for the db tables
      await utils.deleteDataTables();
      await utils.insertDataToTables();


      console.log('-----------------------------------------------');
      console.log('\ttest suite CUSTOMERS');
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

it('get customer by id:1', async ()=>{
        const _id=1;
        const res=await customers.getCustomerById(_id);
        let actual_result=res.rows[0];
        let expected_result=
          {
              id:'1',
              first_name:'Wilber',
              last_name:'Bins',
              address:'Stromanmouth,743 Bruno Pike,United States',
              phone_no:'+258 162-022-9524 x4366',
              user_id:'1',
              credit_card_no:'6771-8966-9009-2882'   
          };

          expect(actual_result).to.eql(expected_result);

  });


it('get ticket by customer_id:1', async ()=>{
    const customer_id=1;
    const res=await customers.getTicketByCustomer(customer_id);
    let actual_result=res.rows[0];
    let expected_result=
      {
          id:'1',
          flight_id:'1',
          customer_id:'1'
      };
  
      expect(actual_result).to.eql(expected_result);
  
  });


it('update customer', async ()=>{
  update_input={
    id:'1',
    first_name:'wilber',
    last_name:'bins',
    address:'nathan,11 Alis island,United States',
    phone_no:'+115 345-666-213-6566',
    user_id:'1',
    credit_card_no:'0000-0000-0000-0000'
  }

  let {id,first_name,last_name,address,phone_no,user_id,credit_card_no}=update_input

  
  const res=await customers.updateCustomers(id,first_name,last_name,address,phone_no,user_id,credit_card_no);
  let actual_result=res;
  let expected_result='1';

    expect(actual_result).to.eql(expected_result);

});

// constraint
/* it('insert ticket' ,async () => {

  let input_insert={
    flight_id:'2',
    customer_id:'2',
  };
  let {flight_id,customer_id}=input_insert;
  let res= await customers.insertTicket(flight_id,customer_id);
  let actual_result=res;
  let expected_result='2';
  expect(actual_result).to.eql(expected_result);
}); */   

it('update ticket' ,async () => {

  let input_update={
    id:'1',
    flight_id:'2',
    customer_id:'1',
  };
  let {id,flight_id,customer_id}=input_update;
  let res= await customers.updateTicket(id,flight_id,customer_id);
  let actual_result=res;
  let expected_result='1';
  expect(actual_result).to.eql(expected_result);
});  



 it('delete ticket' ,async () => {

  let _id='1';
  let res= await customers.deleteTicket(_id);
  let actual_result=res;
  let expected_result='1';
  expect(actual_result).to.eql(expected_result);
});  


 
});

