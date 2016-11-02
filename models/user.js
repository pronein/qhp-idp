var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;*/

var userSchema = new Schema({
	firstname: String,
	lastname: String,
	username:{ type: String, required: true, index: { unique: true } },
	manager: String,
	email: { 
            type: String, 
            validate: { validator: function(email) {
              var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
              return emailRegex.test(email);
          },
          message: 'This is not a valid email!'
        },
        required: [true, 'User email is required'],
        index: { unique: true } 
  },
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
          message: 'This is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      },
	password: { type: String, required: true },
	lastsignin: Date
});

userSchema.statics.findByUserName = function (username, callback) { 

  return this.findOne({ username : username }).exec(callback);
  
}; 
/*userSchema.path('phone').validate(function (phone) {
   var phoneValidation = /\d{3}-\d{3}-\d{4}/;
   return phoneValidation.test(phone);
}, 'User phone number is required.');

userSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'User email is required.');*/


userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //     if (err) return next(err);

    //     // hash the password using our new salt
    //     bcrypt.hash(user.password, salt, function(err, hash) {
    //         if (err) return next(err);

    //         // override the cleartext password with the hashed one
    //         user.password = hash;
    //         next();
    //     });
    // });
    next();
});

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};

