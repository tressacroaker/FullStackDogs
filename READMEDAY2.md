<img src="http://montanacodeschool.com/wp-content/uploads/2016/08/MCS_LOGO_v1-1.png" width="200" align="right"/>

##Full Stack Dogs

##Purpose
The purpose of this week long project is practice creating API's using jQuery, servers using Node, and databases using MongoDB

##Directions

###Day 2

Yesterday, we created a very simple server with a few end points and some dummy data. Today, we are going to both complicate and simplify some things. Let's start off by simplifying.

* Create a new directory called 'controllers'. Add a new file into that folder, and call it dogCtrl.js. In the index.js file, require the dogCtrl.js file.

* In the dogCtrl.js file, we will transfer the functions from the end points, listed in your index.js file, to an object that is being exported as a method. Don't forget to also transfer the file require for your dummy data from dogs.js. In your index.js file, instead of having the entire function definition in the end point, reference the controller method that you placed the function into.

Okay, we have setup a more modular file structure. This way it will be easier to navigate and you won't have a monster sized index.js file. Now, let's complicate things...

We are going to make use of express-session. The purpose of express-session is to create a viewable consistency when logged in. So, if you can think of the last time you opened a website requiring login, you may not have had to actually login, because your session may have still been active. That's what we will be attempting now.

* In your terminal, install express-session to your project with ``npm install --save express-session``. Next, create a config folder, and inside create a config.js file. Inside that file, export an object that only has one key, 'secret'. Give the secret key a value, any value. It is a secret.

* In your .gitignore file, go ahead and add the config folder to it by simply typing config. We don't want anybody seeing our secret.

* In your index.js file, go ahead and require express-session. Also require your config file. Lastly, let's setup express-session by creating some middleware, as follows. ``app.use(session({secret: config.secret}));``

Great, to a minimum, we have express-session ready to use. Let's create a quick and easy login process.
* Note - This is not a secure process and should not be used in the real world for creating login authentication.

* Create a new controller called userCtrl.js. Require it in your index.js. And let's also create some more dummy data to reference in a new file called users.js and don't forget to require that as well. In the users.js, I used the following.
```
module.exports = { //user list
  users: [{
    username: "Steveee",
    password: "steve-O"
  },{
    username: "georgioP ",
    password: "pwPapa12"
  },{
    username: "admin",
    password: "admin"
  }]
};
```

* In the index.js file, create a post endpoint that references a login method in the userCtrl.js file. Be sure to give it a different url, like ``/login``.

* In the login method, using some logic, sort through the users array to determine if the req.body.username and req.body.password match any of the user objects. If so, set req.session.currentUser equal to that user. This will start the session. You can research express-session further if you want to set session rules. Finally, do some more logic to output a message in a req.send() stating whether or not somebody has been logged in.

And thats it, we have started the process of sprawling our work, so that it is easier to read. Also, we have setup a way to keep track of active users, so they don't have to keep logging in on each page they open up.

##If you have more time...

And if you have time, try to finish each of the following.

  * Try to setup a front end login.
  * Keep working on html and css.
  * Add another set of endpoints related to another set of data to keep track of.


##Copyright

(c) Montana Code School, 2016.
