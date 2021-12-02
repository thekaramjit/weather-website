console.log("working");


const fetchWeather=((address)=>{
    
    fetch(`/weather?address=${address}`).then((responce)=>{

    responce.json().then((data)=>{
        if(data.error){
            document.getElementById("errorLocation").textContent=data.error;
            document.getElementById("forecastMsg").textContent="";
        }else{
            document.getElementById("errorLocation").textContent=data[0].location;
            document.getElementById("forecastMsg").textContent=data[0].forecast;    
        }
        
    }); 
});

})



document.querySelector("#searchBtn").addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById("errorLocation").textContent="Loading..."
    let search=document.querySelector("#searchValue").value;
    fetchWeather(search)
    document.querySelector("#searchValue").value="";
})