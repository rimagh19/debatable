/**
 * app.js, main file
 * @author rima alghamdi, 2022
 */

/**
 * @require nodejs.express & nodejs.body-parser
 * */ 
const app = require('express')();
const bodyParser = require('body-parser');

//parsing json files
app.use(bodyParser.json());

//getting requests (deleted)
/*app.get('/', (req, res) => {
  res.send('HELLOOOOO WORLD');
});*/

/**
 * start listening
 * @params {portId, localHost}
 */
app.listen(3001, () => {
    console.log('the app is listening in port 3001');
 });

/**
 * @require ./routers/*
 */
 app.use('/debates', require('./routers/debatesRoutes'));
 app.use('/debates/debate', require('./routers/endoRoutes'));