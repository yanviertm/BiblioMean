import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
  dbstatus: { type: Boolean, default: true},
});

const customer = mongoose.model("customers", customerSchema);

export default customer;
