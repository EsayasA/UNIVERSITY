import mongoose from "mongoose";
import dns from "dns";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Fixed name field
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ],
    validate: {
      validator: async function (value) {
        const domain = value.split("@")[1];
        try {
          // Try to resolve domain (check if it exists)
          await dns.promises.lookup(domain);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: "Invalid email domain",
    },
  },
  password: {
    type: String, // ✅ Fixed password field
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{6,14}$/, "Invalid phone number format"],
  },
  department: { type: String },
  campus: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("User", userSchema);

export default User;
