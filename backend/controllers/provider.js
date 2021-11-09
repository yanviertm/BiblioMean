import provider from "../models/provider.js";

const registerProvider = async (req, res) => {
  if (!req.body.name || !req.body.address) {
    return res.status(400).send("Incomplete data");
  }

  const existingProvider = await provider.findOne({ name: req.body.name });
  if (existingProvider) {
    return res.status(400).send("The provider already exist");
  }

  const providerSchema = new provider({
    name: req.body.name,
    address: req.body.address,
  });

  const result = await providerSchema.save();
  if (!result) return res.status(400).send("Failed  to register provider");

  return res.status(200).send({ result });
};

const listProvider = async (req, res) => {
  const providerSchema = await provider.find();
  if (!providerSchema || providerSchema.length == 0)
    return res.status(400).send("Empty provider list");
  return res.status(200).send({ providerSchema });
};

const updateProvider = async (req, res) => {
  if (!req.body.name || !req.body.address) {
    return res.status(400).send("Incomplete data");
  }

  const existingProvider = await provider.findOne({ name: req.body.name });
  if (existingProvider) {
    return res.status(400).send("The provider already exist");
  }
  const providerUpdate = await provider.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    address: req.body.address,
  });

  return !providerUpdate
    ? res.status(400).send("Error provider update")
    : res.status(200).send("Provider updated");
};

const deleteProvider = async (req, res) => {
  const providerDelete = await provider.findByIdAndDelete({
    _id: req.params["_id"],
  });
  return !providerDelete
    ? res.status(400).send("Error provider delete")
    : res.status(200).send("Provider deleted");
};

export default { registerProvider, listProvider, updateProvider, deleteProvider};
