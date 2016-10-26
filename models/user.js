var mongoose = require('mongoose');
var Schema = mongoose.Schema;
	/*bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

var userSchema = new Schema({
	firstname: String,
	lastname: String,
	username:{ type: String, required: true, index: { unique: true } },
	manager: String,
	email: { type: String, required: true, index: { unique: true } },
	dateofhire: Date,
	team: String,
	project: String,
	office: String,
	jobtitle: String,
	phone: {
        type: String,
        validate: { validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      },
	password: { type: String, required: true },
	lastsignin: Date
});

userSchema.statics.findByUsername = function (username, callback) { 

  var query = this.findOne();
 
  User.findByUsername(username, function (error, user) {
 
    var scope = this;
    var args = arguments;
 
    if (error || !user) {
      return process.nextTick(function () {
        callback.apply(scope, args);
      });
    }
     
    //**********************************************************
    query.where('username', user.username).exec(callback);
  });
   
  return query;
}; 

/*userSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email.text);
}, 'The e-mail field cannot be empty.')*/

/*userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};*/

var User = mongoose.model('User', userSchema);

/*User.findByUsername('Marci', function (error, username) {}); 
User.findByUsername('Marci', function (error, username) {}).populate('username');*/

module.exports = {
	User: User
};