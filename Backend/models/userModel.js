const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const template = mongoose.Schema;
const UserSchema = new template({
    lastName:{
        type:String,
        required : [true, 'Please enter your last name'],
        trim : true
    },
    firstName:{
        type:String,
        required : [true, 'Please enter your first name'],
        trim : true
    },
    email:{
        type: String,
        required : 'Please enter an email',
        unique: true,
        lowercase: true,
        validate : [validator.isEmail, 'Please enter a valid email']
    },
    password : {
        type : String,
        required : [true,'Please enter a password'],
        minlength : [8,'Minimum 8 characters']
    },
    birthDate: {
        type: Date,
        required: [true, "Please enter your birth date."],
        validate: {
          validator: function (value) {
            const today = new Date();
            const birth = new Date(value);
            
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            
            if (
              monthDiff < 0 ||
              (monthDiff === 0 && today.getDate() < birth.getDate())
            ) {
              age--; 
            }
      
            if (age < 18) {
              this.invalidate('birthDate', "You must be at least 18 years old.");
              return false;
            }
      
            return true;
          },
        },
      },
    passwordChangeAt: Date,
    activeToken: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,

    apartments:[
        {
            type: mongoose.Schema.ObjectId,
            ref:'apartments'
        }
    ],
})


UserSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.comparePassword = async function(passwordBody, passwordDB){
    return await bcrypt.compare(passwordBody, passwordDB);
}


UserSchema.methods.isPasswordChanged = async function(jwtTimeStamp){
    if(this.passwordChangeAt){
        const passwordChangedTimestamp = parseInt(this.passwordChangeAt / 1000);
        return jwtTimeStamp < passwordChangedTimestamp;
    }

    return false; 
}

UserSchema.methods.createNewPasswordToken = async function(){
    this.passwordResetToken = await crypto.randomBytes(32).toString("hex");
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    return this.passwordResetToken;
}

module.exports = mongoose.model('users', UserSchema)