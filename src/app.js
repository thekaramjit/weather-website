const express=require('express')
const path=require('path')
const app=express();
const hbs=require("hbs");

const geoCode=require("./utils/geoCode")
const forcast=require("./utils/forcast");
const forecast = require('./utils/forcast');


const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,("../templates/views"))
const partialsPath=path.join(__dirname,"../templates/partials");
const port=process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views',viewPath)
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);


app.get("",(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Karamjit singh"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Karamjit singh"
    })
})

app.get('/help',(req,res)=>{
    
    res.render('help',{
        title:"Help",
        message:"How may i help you!",
        name:"karamjit singh"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        res.send({
            error:"You must provide any address!"
        })
    }else{
        geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                res.send({
                    error:"Unable to find locaiton! Try another search"
                })
            }else{
                forecast(latitude,longitude,(error,forecastData)=>{
                    if(error){
                        res.send({
                            error:"There is an error weather can't update"
                        });
                    }else{
                       res.send([{
                        forecast:forecastData,
                        location:location,
                           address:req.query.address,
                            
                        }]); 
                    }
                });
            }
            
        });
    }
})


app.get("/help/*",(req,res)=>{
    res.render("articleNotFound",{
        title:"404",
        name:"Karamjit Singh",
        errorMessage:"Article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Karamjit Singh",
        errorMessage:"Page not found"
    })
})

app.listen(path,()=>{
    console.log("server is up on port 3000");
})