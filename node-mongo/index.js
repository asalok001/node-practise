const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbops = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion1';

MongoClient.connect(url).then((client) =>{

    console.log('Connected Correctly to Mongo server');

    const db = client.db(dbname);
    
    dbops.insertDocument(db, {name : "Pizza" , description:"test"}, "dishes")
    .then((result) =>{
        console.log("Insert Document : \n", result.ops);
     
        return dbops.findDocuments(db, "dishes");
     })
     .then((docs)=>{
      
        console.log("Found documents : \n", docs);
    
        return dbops.updateDocument(db, {name : 'Pizza'},
         {description : "Updated Pizza"}, "dishes");
     })
     .then((result)=>{

        console.log("Updated Documents: \n", result.result);

        return dbops.findDocuments(db, "dishes");
     })
    .then((docs)=>{
     
        console.log("Found Updated Document :\n", docs);
     
       return  db.dropCollection("dishes")
     })
    .then((result) =>{
        console.log("Dropped Collection", result);

        client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));