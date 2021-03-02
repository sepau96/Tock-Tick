require('dotenv').config();

module.exports = {
    database:{
        URI : `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cbseu.mongodb.net/${process.env.DBNAME }?retryWrites=true&w=majority`
    }
}

