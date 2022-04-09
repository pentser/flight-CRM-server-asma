
const admin_deo=require('../admin_deo');

const insertAirline= async (params)=>{
   const {name}=params;
   try{
      const res=await admin_deo.insertAirline(name);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error(e.message);
   }


}

const updateAirline= async (params)=>{
  const {id,name}=params;
  try{
     const res=await admin_deo.updateAirline(id,name);
     return res;

  }catch(e){
     console.log (e.message);
     return new Error('Airline not exist');
  }


}

const deleteAirline=async (params)=>{
  const {id}=params
  try{
      const res=await admin_deo.deleteAirline(id);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error(e.message);

   }

}

const insertCountry= async (params)=>{
   const {name}=params;
   try{
      const res=await admin_deo.insertCountry(name);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error(e.message);
   }


}

const updateCountry= async (params)=>{
  const {id,name}=params;
  try{
     const res=await admin_deo.updateCountry(id,name);
     return res;

  }catch(e){
     console.log (e.message);
     return new Error('country not exist');
  }


}

const deleteCountry=async (params)=>{
  const {id}=params
  try{
      const res=await admin_deo.deleteCountry(id);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error(e.message);

   }

}


const insertUser= async (params)=>{
   const {username,password,email,rule}=params;
   try{
      const res=await admin_deo.insertUser(username,password,email,rule);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error(e.message);
   }


}

const updateUser= async (params)=>{
  const {id,user,password,email,rule}=params;
  try{
     const res=await admin_deo.updateUser(id,user,password,email,rule);
     return res;

  }catch(e){
     console.log (e.message);
     return new Error('user not exist');
  }


}

const deleteUser=async (params)=>{
  const {id}=params
  try{
      const res=await admin_deo.deleteUser(id);
      return res;

   }catch(e){
      console.log (e.message);
      return new Error('user not exist');

   }

}

const  getAllUsers=async ()=>{

   try {
    const res=await admin_deo.getAllUsers();
    return res.rows;
   }catch(e){
       console.log (e.message);
       return new Error(e.message);
      


   }
}

const  getAllTickets=async ()=>{

   try {
    const res=await admin_deo.getAllTickets();
    return res.rows;
   }catch(e){
       console.log (e.message);
       return new Error(e.message);

   }
}

const  getAllTicketsJoin=async ()=>{

   try {
    const res=await admin_deo.getAllTicketsJoin();
    return res.rows;
   }catch(e){
       console.log (e.message);
       return new Error(e.message);

   }
}

const  getAllCustomers=async ()=>{

   try {
    const res=await admin_deo.getAllCustomers();
    return res.rows;
   }catch(e){
      return new Error(e.message);

   }
}

const getUserById= async (params)=>{
   const {id}=params;
   try{
      const res=await admin_deo.getUserById(id);
      return res;
 
   }catch(e){
      return new Error('user id not exist');
   }
 
 
 }

 const getAdminByUser= async (params)=>{
   const {username}=params;
   try{
      const res=await admin_deo.getAdminByUser(username);
      return res;
 
   }catch(e){
      console.log (e.message);
      return new Error('user not exist');

   }
 
 
 }


 const getAllTransactions=async ()=>{

   try {
    const res=await admin_deo.getAllTransactions();
    return res
   }catch(e){
       console.log (e.message);
       return new Error(e.message);

   }
}


const getUserByUser= async (params)=>{
   const {username}=params;
   try{
      const res=await admin_deo.getUserByUser(username);
      return res;
 
   }catch(e){
      console.log (e.message);
      return new Error('username not exists')
   }
 
 }
 


/* const checkUsernameAvailability=async (params)=>{
   const {name}=params
   try{
       const res=await admin
       return res;
 
    }catch(e){
       console.log (e.message)
    }
 
 } */







module.exports={
  

    insertUser,
    updateUser,
    deleteUser,

    insertAirline,
    updateAirline,
    deleteAirline,

    insertCountry,
    updateCountry,
    deleteCountry,

    getAllUsers,
    getAllTickets,
    getAllTicketsJoin,
    getAllCustomers,
    getUserById,
    getUserByUser,
    getAdminByUser,

    getAllTransactions,
    


}

















