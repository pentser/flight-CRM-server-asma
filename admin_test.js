const assert = require('assert'); // for the testing capabilites
const expect = require('chai').expect; // for chai syntax 
const utils=require("./utils_deo");
const admin=require("./admin_deo");



describe('admin test suite',  function() {
    before(async function() {
      // runs once before the first test in this block
      // genertor_db seed for the db tables
      await utils.deleteDataTables();
      await utils.insertDataToTables();


      console.log('-----------------------------------------------');
      console.log('\ttest suite ADMIN');
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

  
  const res=await admin.updateCustomer(id,first_name,last_name,address,phone_no,user_id,credit_card_no);
  let actual_result=res;
  let expected_result='1';

    expect(actual_result).to.eql(expected_result);

});

  //constraint
/* it('delete customer' ,async () => {
  
    let _id='1';
    let res= await admin.deleteCustomer(_id);
    let actual_result=res;
    let expected_result='1';
    expect(actual_result).to.eql(expected_result);
});  */


 it('update airline' ,async () => {

    let input_update={
      id:'1',
      name:'AL-AL Israel', 
      country_id:1,
      user_id:'2',
    };
    let {id,name,country_id,user_id}=input_update;
    let res= await admin.updateAirline(id,name,country_id,user_id)
    let actual_result=res;
    let expected_result='1';
    expect(actual_result).to.eql(expected_result);
  }); 


/* it('insert airline' ,async () => {

    let input_insert={
      name:'ali-express hungary', 
      country_id:3,
      user_id:'3',
    };
    let {name,country_id,user_id}=input_insert;
    let res= await admin.insertAirline(name,country_id,user_id)
    let actual_result=res;
    let expected_result='2';
    expect(actual_result).to.eql(expected_result);
  });  */

it('get all users:  ' ,async () => {
       
    
    let res= await admin.getAllUsers();
    let actual_result=res.rows;
    let expected_result=[

      {
          id:"1",
          username:"angryostrich988",
          password:"r2d2",
          email:"louane.vidal@example.com",
          rule:"Customer"
      },
      {
        id:"2",
        username:"angryduck156",
        password:"0101",
        email:"don.white@example.com",
        rule:"Airline"
      }
    ]
   
    expect(actual_result).to.eql(expected_result);
  });

it('get user by id ' ,async () => {
       
    
    id="1"
    let res= await admin.getUserById(id);
    let actual_result=res.rows;
    let expected_result=[

      {
        id:"1",
        username:"angryostrich988",
        password:"r2d2",
        email:"louane.vidal@example.com",
        rule:"Customer"

      }
    ]
   
    expect(actual_result).to.eql(expected_result);
  });









  

});




 

 