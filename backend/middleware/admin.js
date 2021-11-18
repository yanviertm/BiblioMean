import adminModel from "../models/admin.js";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk2NzliZjI4ODVlMzQ1YTZjNzE1NzQiLCJlbWFpbCI6ImFkbWluQG1haWwuY28iLCJuYW1lIjoiYWRtaW5QcnVlYmEiLCJpYXQiOjE2MzcyNTE1Mzl9.5h5zdpFjoY5ot89VPAX0tuZoLmDDxOqMOGeTMHG39cA
const admin = async (req, res, next) => {
  const adminRole = await adminModel.findById(req.user._id);
  if (!adminRole) {
    return res.status(400).send({ message: "Unauthorized" });
  } else {
    return next();
  }
};

export default admin;
