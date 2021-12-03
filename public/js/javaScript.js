// const fetchWeather=((address)=>{
    
//     fetch(`/weather?address=${address}`).then((responce)=>{

//     responce.json().then((data)=>{
//         if(data.error){
//             document.getElementById("errorLocation").textContent=data.error;
//             document.getElementById("forecastMsg").textContent="";
//         }else{
//             document.getElementById("errorLocation").textContent=data[0].location;
//             document.getElementById("forecastMsg").textContent=data[0].forecast;    
//         }
//     }); 
// });

// })



// document.querySelector("#searchBtn").addEventListener("click",(e)=>{
//     e.preventDefault();
//     document.getElementById("errorLocation").textContent="Loading..."
//     let search=document.querySelector("#searchValue").value;
//     fetchWeather(search)
//     document.querySelector("#searchValue").value="";
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#errorLocation')
const messageTwo = document.querySelector('#forecastMsg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})