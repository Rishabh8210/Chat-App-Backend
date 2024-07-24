const mongoose = require('mongoose')
const {DBURL} = process.env.DBURL
console.log(DBURL)
const uri = "mongodb+srv://rishabhpandey8092:Rishabh8210@testing.cizq4fq.mongodb.net/"

function setupDB(){
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch(err => {
        console.error('Error connecting to MongoDB Atlas', err);
    });
}

module.exports = {
    setupDB
}