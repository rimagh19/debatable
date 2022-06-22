//create express-bodyParser functions
const express = require('express');
const bodyParser = require('body-parser');

//create app (express func)
const app = express();

//b4 listening to any json file parse it
app.use(bodyParser.json());

//getting requests
/*app.get('/', (req, res) => {
  res.send('HELLOOOOO WORLD');
});*/

//start listening
app.listen(3001, () => {
    console.log('the app is listening in port 3001');
 });


 app.use('/debates', require('./routers/debatesRoutes'));
