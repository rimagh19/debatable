//create express function
const express = require('express');

//create app (express func)
const app = express();

//getting requests
app.get('/', (req, res) => {
  res.send('HELLOOOOO WORLD');
});

//start listening
app.listen(3001, () => {
    console.log('the app is listening in port 3001');
 });