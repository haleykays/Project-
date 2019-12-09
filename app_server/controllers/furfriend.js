const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

const Searchinfo = (req, res) => {
  console.log(req.params.callsign);
  const callsign = req.params.callsign;

  Pets.find(
      {
          type: type, 
          breed: breed, 
          age: age, 
          color: color
      },
      //callback
      (err, docs) => {
          //send records back
          if(!err){
              res.send(docs);
          }else{
              res.send(err);
              console.log(err);
          }
      }
  );    

}

module.exports = {
Searchinfo,
};