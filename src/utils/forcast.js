const request=require("postman-request");

const forecast=(latitude,longitude,callback)=>{

    const url="http://api.weatherstack.com/current?access_key=874df3c74729a0b37beb742a6714a0d8&query="+latitude+","+longitude+"&units = m";

    

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to server!",undefined);
            }
            else if(body.error){
                callback("No match found!",undefined);
            }else{
                    callback(undefined,"Weather is mostly "+body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degree out and feels like "+body.current.feelslike+". There is "+body.current.precip+"% chance of rain");
            }
    })
}

module.exports=forecast;