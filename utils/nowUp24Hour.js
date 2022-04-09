



function generateDeartureAndLandingTimeNowUp24Hours() {

// generate hours flight time
let hour=Math.floor((Math.random() * 15) + 1);


let today=new Date();
let h= today.getHours();
today.setHours(h-hour)
let departure_time= today;
let Original_departur_time=new Date(departure_time);
let landing_time=new Date(departure_time.setHours(departure_time.getHours()+hour));
return {
    departure_time:Original_departur_time,
    landing_time
};

}


module.exports=generateDeartureAndLandingTimeNowUp24Hours;







