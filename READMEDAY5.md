<img src="http://montanacodeschool.com/wp-content/uploads/2015/06/MCS_LOGO_v1.png" width="200" align="right"/>

##Full Stack Dogs

##Purpose
The purpose of this week long project is practice creating API's using jQuery, servers using Node, and databases using MongoDB

##Directions

###Day 5

On our last day project, we created a fully functional back end using node, npm, mongo, and models/schemas. Now, let's add the last bit of functionality by creating a login authentication.

###Setup

First, let's setup our packages. In your terminal, you will need to install passport, passport-local, bcrypt-nodejs, and express-session.

Next, we will have to prep our index.js file. Require in passport and express session. Don't worry about the other two. We will call those into other files later. Require in a self invoking passport file using the following syntax. ``require('./config/passport.js')(passport);`` And obviously, in the example, I have created a config folder and a passport.js file. You don't necessarily have to create a config folder, but you will need to create a passport.js file.

Next, we will need to setup our middleware. Let's start with setting up express-session. Create a hidden config.js file that includes an object containing a secret. Require this file and inject it into ``app.use(session(config))``as such. Don't forget to ignore the config.js file.

You will then need to setup passport so that it initializes and hooks up with express-session. Input the following code.
```
app.use(passport.initialize());
app.use(passport.session());
```

Finally, you will need to set up the endpoint for login. Create a "POST" endpoint with a selected url extension. For local authentication, an extra parameter is necessary to function properly. After injecting your url extension, place ``passport.authenticate('local-signup')`` as a parameter, then we can inject our callback function after that. In this case, all we need to do is send back the response from passport, so inside the callback function, we can simply run ``res.send();``. If you would like some consistency, create a controller for the callback function.

###Passport Local

Before we get started in the passport.js file, go ahead and create a user model. Be sure to require in mongoose and bcrypt-nodejs. Setup the user Schema the same way we set it up for the dog model. Make sure you require an email or username and a password. The only special requirement for local authentication is password encryption. After you have built your schema, make sure the following code is included before you export the model. My schema was named userSchema, so make sure your schema name matches up with the given schema name.
```
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
```

In the passport.js file, require in your user model and passport-local referencing the Strategy method.

Export a function with passport as the parameter. Inside the function we need three different statements. Two of them are to serialize and deserialize the user object. We are doing this to collect information about the user and the session. Use the following code.
```
passport.serializeUser(function(user, done) {
    console.log("USER", user);
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    console.log("ID", id);
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
```
The third statement will setup your user object to be functional with local strategy, then it will have an associated callback function. The callback function will first check for email/username and password validity. If it is a new email/username and password, a new user will be created and added to mongo. The third statement can be seen below.
```
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
          User.findOne({'email': email}, function(err, user) {
              if (err) return done(err);
              if (user) {
                if (user.validPassword(password)) {
                  console.log('worksgood');
                    return done(null, user);
                } else {
                  console.log('Invalid email or password');
                    return done(null, false);
                }
              } else { //otherwise, make a new user
                  var newUser = new User(req.body);
                  newUser.email    = email;
                  newUser.password = newUser.generateHash(password);
                  newUser.save(function(err) {
                      if (err) throw err;
                      return done(null, newUser);
                  });
              }
          });
        });
    }));
```
This is all that is needed in order to create a new encrypted user for login, as well as testing for valid entries. When you have made it this far, test your code using Postman and RoboMongo to make sure everything is running properly.

* Note: When you login and are successful, you are creating a session. If you would like to login with a different name, you will have to refresh nodemon to expire the session.


##If You Have More time

If you have more time, go ahead and set up your front end. Things to think about include the following.
  * Use a login modal or inline input boxes.
  * Create an opportunity to register a new user.
  * If using a modal, set up your styles so that when the user logs in, the modal disappears.
  * Create your ajax request linking the data from the input boxes to the function.
  * Create a get user function
    * Note: In order to do this, set up an end point on the back end that finds a user by id and uses ``req.user._id`` as the value you are searching for.
```
    userModel
      .findById(req.user._id)
      .exec(function (err, result) {
        if (err) {
          return res.send(err);
        }
        res.send(result);
      });
```
  * Create a logout function
    * Note: In order to do this, you will need to create another endpoint that simply logs out and sends back a response. Use the following methods.
```
    req.logout();
    res.send();
```

##Copyright

(c) Montana Code School, 2016.
