<img src="http://montanacodeschool.com/wp-content/uploads/2016/08/MCS_LOGO_v1-1.png" width="200" align="right"/>

##Full Stack Dogs

##Purpose
The purpose of this week long project is practice creating API's using jQuery, servers using Node, and databases using MongoDB

##Directions

###Day 4

Yesterday, we created our first Mongo database, but really any data could be added with little structure. Today, we will finish off the week by introducing Mongoose and the structure of models and Schemas.

Since we are using Mongoose now, we will have to once again restructure.

* Remove anything mongojs and mongodb related. This includes the requires in the controllers and the dependancies in the package.json file.

* Now, we need to set up Mongoose. Do an ``npm install --save mongoose`` to install it. Require it in the index.js file. Also, we are going to tell mongoose where to find our database location so set up the following code down by your app.listen method. This will locate you local 27017 port for the database. This will also console.log a message in your terminal so you know its running properly. Also, while we're at it, don't forget to run mongod in your terminal.
```
mongoose.connect("mongodb://localhost:27017/dogs");
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});
```

Okay, here is the fun part. We're going to create each of our models. A model will be any stand alone data structure that is not dependent on any other data. We will also create Schemas. A Schema is a lower level structured dataset, and in its case, it is dependent upon a parent data structure. We will start by making the dog model.

* Create a new models folder. Inside the models folder, create a new file called DogModel.js. In the DogModel.js file, require mongoose.

* Now, set up the data structure for the dog. This means that every dog object will have a specific set of keys of a particular type. Below is an example of the syntax.

```
var dogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    breed: {type: String, required: true},
    hasTail: {type: Boolean, required: false},
    numberOfFeet: {type: Number, required: false}
});
```
* When you are done, export the mongoose model ``mongoose.model('Dog', dogSchema)``.

We're getting closer. Because we got rid of mongodb and mongojs, we are going to have to restructure our endpoints using new methods provided by mongoose.

* In your controller, require the dogModel file. The CRUD methods, this time, are .save, .find, .findByIdAndUpdate, and .findByIdAndRemove. Using DogModel, run through each of the endpoints and update the methods and include a callback function calling in err and result as parameters. Make god use of error handling.

  * For the POST, you will need to create a new object using the model as a constructor function. ``var dog = new DogModel(req.body);`` Then, use the new object to run the .save method.
  * For the GET, use the DogModel to run .find, then .exec.
  * For the PUT, use the DogModel to run .findByIdAndUpdate, but this time, before the callback, plug in req.params.id, req.body as arguments.
  * For the DELETE, use the DogModel to run .findByIdAndRemove, and similar to the PUT endpoint, before the callback, plug in req.params.id, req.body as arguments.

When you have completed this process, test each of your endpoints using Postman and RoboMongo/MongoChef. Perform the request in Postman, and if done correctly, data should populate in both Postman and RoboMongo.

If all of that works, let's move on to a couple of other concepts.

* If you were able to create another set of endpoints for another dataset, create another model, and update your controller. Test to make sure everything works. I used dog toys as my other model.

Now, what if we wanted to associate the toy with the dog? So, in the dog model, he could have a list of toys, and we could reference the toy model.

* In order to do this, we would set up a toy key in the dog model, and instead of a String or Number type, we would use the following, referencing the DogToy model. ``toys: [{type:mongoose.Schema.Types.ObjectId, ref: "DogToy" }]`` Also, for this to work, we would need to require the dogToy model.

* This will almost work. The only other thing we need to do is go into the dog controller, and in our GET endpoint, we need to add the method ``.populate('toys')`` between the .find and .exec methods. Without this, all we will see is an id for the toy. This will allow us to see the entire toy object.

The last concept I will like to use is the process of embedding Schemas. So, going back to the dog, we referenced another model, but what if we just want to simplify our object by splitting up our object? If I wanted to nest other object within my model object, my code could get very big and bulky. As you can see, I added an owner key that has a value of an object. If I wanted to break that apart, I could create an owner Schema and embed it into my model object.
```
var dogSchema = new mongoose.Schema({ //setup schema object description with key values
    name: {type: String, required: true},
    breed: {type: String, required: true},
    color: {type: String, required: true},
    toys: [{type:mongoose.Schema.Types.ObjectId, ref: "DogToy" }],
    owner: {
        name: {type: String, required: true},
        human: {type: Boolean, required: true},
        job: {type: String, required: true},
        givesTreats: {type: Boolean, required: true}
    }
});
```

* To do this, lets create a new file called ownerSchema.js. In the ownerSchema.js file, require mongoose and setup a new Schema like the one we have in our dogSchema. When we go to export the object, it will look slightly different. It should look something like this. ``module.exports = ('Owner', ownerSchema);``

* Now if you require the ownerSchema in you dogSchema, we can embed the object into the value for the owner key. It will look like this. ``owner: Owner``

And that's all. I hope you have learned a lot about servers, Node, MongoDB, Schemas/Models, Sessions, and all of the tools and techniques used to organize our data.


##Copyright

(c) Montana Code School, 2016.
