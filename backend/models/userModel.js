import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next){
  try {
    //if not modified, just move to next
    if(!this.isModified('password')){
      next()
    }
    //add salt to plain password
    const salt = await bcrypt.genSalt(10);
    //generate hashed password
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    next(error)
  }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
