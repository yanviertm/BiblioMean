import admin from "../models/admin.js";
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";

const registerAdmin = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send("Incomplete data");
  }

  const existingAdmin = await admin.findOne({ email: req.body.email });
  if (existingAdmin) {
    return res.status(400).send("The admin already exist");
  }

  const hash = await bcrypt.hash(req.body.password,10);

  const adminSchema = new admin({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  const result = await adminSchema.save();
  if (!result) return res.status(400).send("Failed  to register admin");

  return res.status(200).send({ result });
};

const listAdmin = async (req, res) => {
  const adminSchema = await admin.find();
  if (!adminSchema || adminSchema.length == 0)
    return res.status(400).send("Empty admin list");
  return res.status(200).send({ adminSchema });
};

const updateAdmin = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send("Incomplete data");
  }

  const existingAdmin = await admin.findOne({ email: req.body.email });
  if (existingAdmin) {
    return res.status(400).send("The admin already exist");
  }

  const adminUpdate = await admin.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  return !adminUpdate
    ? res.status(400).send("Error admin update")
    : res.status(200).send(adminUpdate);
};

const deleteAdmin = async (req, res) => {
  const adminDelete = await admin.findByIdAndDelete({
    _id: req.params["_id"],
  });
  return !adminDelete
    ? res.status(400).send("Error admin delete")
    : res.status(200).send("Admin deleted");
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(200).send("Incomplete data");

  const adminLogin = await admin.findOne({ email: req.body.email });
  if (!adminLogin) return res.status(400).send("Wrong email or password");

  const hash = await bcrypt.compare(req.body.password, adminLogin.password);
  if (!hash) return res.status(400).send("Wrong email or password");
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: adminLogin._id,
          email: adminLogin.email,
          name: adminLogin.name,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {}
};

export default {
  registerAdmin,
  listAdmin,
  updateAdmin,
  deleteAdmin,
  login
};
