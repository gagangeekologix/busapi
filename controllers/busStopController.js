const BusStop = require("../models/busStop");

exports.createBusStop = async (req, res) => {
  try {
    console.log("this is body",req.body)
    const busStop = await BusStop.create(req.body);
    res.status(201).json(busStop);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating bus stop' });
  }
};

exports.getBusStop = async (req, res) => {
  try {
    const busStop = await BusStop.findById(req.params.id);
    if (!busStop) {
      return res.status(404).json({ message: 'Bus stop not found' });
    }
    res.json(busStop);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bus stop' });
  }
};
exports.updateBusStop = async (req, res) => {
  try {
    const updatedBusStop = await BusStop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBusStop) {
      return res.status(404).json({ message: 'Bus stop not found' });
    }
    res.json(updatedBusStop);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bus stop' });
  }
};

exports.deleteBusStop = async (req, res) => {
  try {
    const deletedBusStop = await BusStop.findByIdAndDelete(req.params.id);
    if (!deletedBusStop) {
      return res.status(404).json({ message: 'Bus stop not found' });
    }
    res.json({ message: 'Bus stop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bus stop' });
  }
};

exports.listBusStops = async (req, res) => {
  try {
    const busStops = await BusStop.find();
    res.json(busStops);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bus stops' });
  }
};

exports.addNewStop = async (req, res) => {
    try {
      const { name } = req.body;
      const busStop = await BusStop.create({ name });
      res.status(201).json(busStop);
    } catch (error) {
      res.status(500).json({ message: 'Error creating bus stop' });
    }
  }