import mongoose from "mongoose";
import dns from "dns";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ],
    validate: {
      validator: async function (value) {
        const domain = value.split("@")[1];
        try {
          // Check MX records (email servers) instead of generic DNS lookup
          const records = await dns.promises.resolveMx(domain);
          return records && records.length > 0;
        } catch (err) {
          return false;
        }
      },
      message: "Email domain does not exist",
    },
  },

  password: {
    type: String,
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
