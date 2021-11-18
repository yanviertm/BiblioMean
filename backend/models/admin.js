import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
  dbstatus: { type: Boolean, default: true},
});

const admin = mongoose.model("admins", adminSchema);

export default admin;
