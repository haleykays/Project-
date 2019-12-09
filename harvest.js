const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./app_api/models/furfriend');
const Pets = mongoose.model('Pets');

const type = [
"Dogs", 
"Cats", 
"Other pets"
];
const breed = 
[
    "American Bulldog", 
    "Akita",
    "American Cocker Spaniel", 
    "Australian Shepard",
    "Basset Hound",
    "Beagle", 
    "Blood Hound",
    "Blue Heeler", 
    "Boxer",  
    "Bull Terrior",
    "Chiuahua", 
    "Chow Chow",
    "Corgi", 
    "Dachshund", 
    "English Bulldog", 
    "French Bulldog",
    "German Shepard", 
    "Great Pyreness", 
    "Greyhound", 
    "Husky", 
    "Italian Greyhound", 
    "Jack Russell Terrier", 
    "Labrador Retriever", 
    "Maltese", 
    "Mastiff", 
    "Miniature Australian Shepard", 
    "Miniature Pincher", 
    "Mixed Breed",
    "Other",  
    "Pit Bull Terrier", 
    "Pomeranian", 
    "Poodle", 
    "Pug", 
    "Rottweiler", 
    "Schnauzer", 
    "Shih Tzu", 
    "Yorkshire Terrier", 
];

const age
[
    "0-1 years", 
    "2-3 years", 
    "4-5 years", 
    "6-7 years", 
    "8-9 years", 
    "10-11 years", 
    "12+ years",
];

const color
[
    "Black", 
    "Brindle",
    "Brown",
    "Grey",
    "Mixed Color",
    "Tan", 
    "White", 
    "Other",     
];



const createPetsModel = (pets) => {
    return {

        type: pets.type, 
        breed: pets.breed,
        age: pets.age, 
        color: pets.color
    }
};




const task = cron.schedule('1 * * * *', () => {

   axios.get('grant_type=client_credentials&client_id=tsSQGgjBUm3AHq0qqDHMGftj9SJCjyYOmo7JOTPNSn4dSfMld2&client_secret=BmksYdt4ImlITTl7HliFDcXPKGD2waofrfXeLSFw')
    .then( (response) => {
        const writePetsModelListToPersist = (pet_list) => {

            //pull connection string from environment variable
            const uri = process.env.MONGODB_ATLAS_URL;
        
            //this example uses ES6 template literals for string interpolation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
                    .catch(err => console.log(err));
           
            //insert the most recent list - https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
            var promise = Pets.insertMany(pet_list, (err, docs) => {
                if(!err){
                    console.log(`INSERTED: ${pet_list.length} records`);
                }else{
                    console.log(err);
                }
            });
        }
    })
    .catch( (error) => {
        console.log(error);
    });

    },{
        scheduled: false
    }
);

module.exports = task;