const express = require('express');
const cors = require('cors');
const cookieParser =  require('cookie-parser');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const { eventNames } = require('../databasePool');
const bodyParser = require('body-parser');
const accountRouter = require('./api/account');

const app = express();

app.use(cors({origin: 'http://localhost:5000', credentials: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const engine = new GenerationEngine();

app.use('/account', accountRouter);
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

// app.use((req, res, next) =>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
    
//     next();
// }) 
//app.use is a middleware function in express
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500

   res.json({
       type: 'error', message: err.message
   })
});

app.locals.engine = engine;


engine.start();


module.exports = app;

// const Generation = require('./generation');
// 
// const generation = new Generation();
// 
// console.log('generation', generation);
//  
// const gooby = generation.newDragon();
// 
// console.log("gooby", gooby);
// 
// setTimeout(() => {
//    const mimar = generation.newDragon();
//    console.log("mimar", mimar);
// }, 25000);







// const Dragon = require('./dragon');
// 
// const fooey = new Dragon({
    // birthday: new Date(), 
    // nickname: 'fooey'}
    // );
// const baloo = new Dragon({
    // birthdate: new Date(), 
    // nickname: 'baloo',
    // traits: [{traitType: 'backgroundColor', traitValue: 'green'}]   
// });
// 
// const timex = new Dragon();
// 
// 
// setTimeout(() => { 
//    const gooby = new Dragon(); 
// }, 3000); 
// 
// console.log("baloo: ", baloo)
// 