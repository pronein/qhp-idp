var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

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

userSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.hash(user.password, null, null, function(err, hash){
      if (err){
        next();
      }
      user.password = hash;
      next();
    });
  }
  next();
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};

