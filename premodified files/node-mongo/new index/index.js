const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbops = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion1';

MongoClient.connect(url , (err, client) =>{

    // { useUnifiedTopology: true }
    assert.equal(err, null);
    console.log('Connected Correctly to Mongo server');

    const db = client.db(dbname);
    
    dbops.insertDocument(db, {name : "Pizza" , description:"test"}, "dishes", (result) =>{
        console.log("Insert Document : \n", result.ops);

         dbops.findDocuments(db, "dishes", (docs)=>{
        console.log("Found documents : \n", docs);
    });

    dbops.updateDocument(db, {name : 'Pizza'}, {description : "Updated Pizza"}, "dishes", (result)=>{

        console.log("Updated Documents: \n", result.result);

        dbops.findDocuments(db, "dishes", (docs)=>{
            console.log("Found Document :\n", docs);
        });

    db.dropCollection("dishes", (result) =>{
        console.log("Dropped Collection", result);

        client.close();
    });

    });
    });

   
});