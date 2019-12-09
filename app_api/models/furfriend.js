const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const petsSchema = new Schema({
    pid: String, 
    type: String, 
    breed: String, 
    age: String, 
    color: String
});

mongoose.model('Pets', petsSchema);

//const Client = mongoose.model('Client', clientSchema);