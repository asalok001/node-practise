const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';

const connect = mongoose.connect(url);

connect.then((db) =>{
    console.log("connected to mongo server");

    Dishes.create({
        name: 'Pizza',
        description: 'Pizza Test' 
    })
      .then((dish) =>{
            console.log(dish);

            return Dishes.findByIdAndUpdate( dish._id,{
                $set : {description :" Updated Pizza"}
            },{
                new : true
            }).exec();
        })
        .then((dish) =>{
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: "My Delicious Pizza",
                author: "Alok Singh"
                
            });

            return dish.save();
        })
        .then((dish) =>{
            console.log(dish);
            return Dishes.remove({});
        })
        .then(() =>{
            return mongoose.connection.close();
        })
        .catch((err) =>{
            console.log(err);
        });
});