<img src="http://montanacodeschool.com/wp-content/uploads/2016/08/MCS_LOGO_v1-1.png" width="200" align="right"/>

##Full Stack Dogs

##Purpose
The purpose of this week long project is practice creating API's using jQuery, servers using Node, and databases using MongoDB

##Directions

###Day 3

Yesterday, we created setup some controllers to simplify our index.js file. We also played with express-session to maintain logged in user sessions in our site. Today, we will get into persistent data using MongoDB databases.

* First things first, let's get rid of anything session related. Delete the config folder, remove config from the .gitignore, remove the express-session require, remove the express-session dependancy on the package.json, and remove all of the user files.

* Next, go ahead and install both mongojs and mongodb using ``npm install --save mongojs mongodb``. Also, remember to set up another tab in your terminal and run mongod.

* In your dogCtrl.js file, require mongojs and the ObjectId method in mongodb.

* Next setup your database structure by calling the name of your database, followed by the collection name in square brackets. This is what I used. ``var dbdog = mongojs('dogs', ['doginfo']);``

* Now, update your endpoint methods. In order to use mongojs, use the following methods to do your CRUD commands. (.insert, .find, .findAndModify, .remove) (CRUD) The syntax is to run the structure you made in the previous step, go into the collection, then run the method. ``dbdog.doginfo.insert(req.body,function(err,result){res.send(results)})``

* For methods that require an Id, like PUT and DELETE, use the ObjectId method in mongodb. For the PUT method, you will need to create a special object that will go into the first argument of the mongojs method .findAndModify. It looks something like this.
```
var updateObj = {
  query: {_id: ObjectId(req.params.id)},
  update: {$set: req.body},
  new: false
};
```
For the DELETE method, you will only need an object that looks liek this. ``{_id:ObjectId(req.params.id)}``

When you have completed this process, test each of your endpoints using both Postman and RoboMongo/MongoChef. Perform the request in Postman, and if done correctly, data should populate in both Postman and RoboMongo.

If everything tests out good, jump for joy. You have created your first fully functioning database.


##If you have more time...

And if you have time, try to finish each of the following.

  * Setup another set of stand alone end points that are somewhat related. I set up another one with dog toys. This will be used tomorrow and may be useful to have.
  * Keep working on html and css.
  * Build up some data in your database. It's more fun to see lots of data, which can be manipulated and tooled around with.


##Copyright

(c) Montana Code School, 2016.
