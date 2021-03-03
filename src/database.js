const mongoose = require('mongoose');


const { database } = require('./keys')

 const basedatos = mongoose.connect(database.URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
    })
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));
    


 