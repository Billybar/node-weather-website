const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Deifine paths for express config
const publicDirectionPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handelbars engine and views location  
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectionPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
    name: 'b.b king',
    holla: 'Shalom'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'ABC',
    amigo: 'ITS ALL ABOUT YOU'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'HELP ME I\'M IN THE JUNGLE',
    name: 'Good Question',
    message: 'holla amigo, welcome to the first message in the world. you are smart but not too much, which is very good!!'
  })
})


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address given, must add an address'
    })
  }


  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

})


app.get('/products', (req, res) => {
  res.send({
    product: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found Go Back',
    name: 'ABC'
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'The Page you after isn\'t exist Go Back ',
    name: 'King BBC'
  })
})




app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})