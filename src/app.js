const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geoCode = require('./utils/geocode')
const foreCast =  require('./utils/forecast')

const app=express()

const pathDirection = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsViews = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsViews)

app.use(express.static(pathDirection))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Today's Weather Report",
        name:'Snigdhadeb Ash'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us:',
        name:'Snigdhadeb Ash'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address not found',
        })

    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        foreCast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'Weather Report',
    //     location: 'durgapur',
    //     address: req.query.address,
    // })
})

// app.get('/products',(req,res)=>{
//    if(!req.query.search){
//       return res.send({
//           error:'Not Found',
//       })
//    }

//     console.log(req.query.search)
//     res.send({
//         products:[],
//     })
// })

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Contact Us',
        name:'Snigdhadeb Ash',
    })
})

app.get('*',(req,res)=>{
    res.send("<h1>404 Error, Page Not Found</h1>")
})
app.listen(3000,()=>{
    console.log('Server is up in port 3000')
})