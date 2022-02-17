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
    const collection = db.collection('dishes');

    collection.insertOne({"name" : "Aloo Paratha", "description":"Test"}, (err , result) =>{

        assert.equal(err, null);

        console.log('After Insertion : \n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) =>{
            assert.equal(err, null);

            console.log('Found : \n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) =>{

                assert.equal(err, null);

                client.close();
            });
        });
    });
});