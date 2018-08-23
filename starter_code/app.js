
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(punkAPIBeers =>{
    let data={
      beersForView: punkAPIBeers
    };
    res.render('beers',data); // Renders "views/beers.hbs"
  })
  .catch(error => {
    console.log('error')
  })
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random-beer',{
      beer: beers[0]
    }); // Renders "views/random-beer.hbs"
  })
  .catch(error => {
    console.log(error)
  })
})

app.listen(3000, () => {
  console.log("Server started on port 3000")
});
