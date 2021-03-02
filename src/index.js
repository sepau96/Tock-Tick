const express = require('express');

const config = require('./server/config');
const port = process.env.PORT || 3000;


//Database connect
require('./database');

//Starting app
const app = config(express());





// app.listen(app.get('port'), () => {
//     console.log('http://localhost:3000', app.get('port'));
// });

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });