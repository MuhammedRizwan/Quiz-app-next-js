import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: [true, "Please provide a email"]
   },
   email: {
      type: String,
      required: [true, "please provide a email"]
   },
   role: {
      type: String,
      enum: ["student", "instructor"]
   },
   password: {
      type: String,
      required: [true, "Please provide a password"]
   },
}, {
   timestamps: true
})

const User = mongoose.models.users || mongoose.model('users', userSchema)
export default User;