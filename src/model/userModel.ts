import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: [true, "Please provide a username"]
   },
   email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true
   },
   role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student"
   },
   password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false
   },
}, {
   timestamps: true
})

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.models.users || mongoose.model('users', userSchema)
export default User;