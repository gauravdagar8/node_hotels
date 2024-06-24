// sets up Passport with a local authentication strategy, using a Person model for use

const passport = require('passport');
const localstrategy = require('passport-local').Strategy; //Username and password strategy
const personHandle = '/models/person.js';
const Person = require(personHandle);




passport.use(new localstrategy(async (USERNAME, password, done) => {
    try {
    //   console.log('Received Credentials :', USERNAME, password);
      const user = await Person.findOne({username: USERNAME});
      if(!user)
        return done(null, false, {message:'Incorrect username.'});
  
      const isPasswordMatch = await user.comparePassword(password);
      if(isPasswordMatch) {
        return done(null, user);
      }else {
        return done(null, false, {message: 'Incorrect password'});
      }
    }catch(err) {
      return done(err);
    }
  }))

  module.exports = passport // Export configured passport