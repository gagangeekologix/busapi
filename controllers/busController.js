const Bus = require("../models/bus");
const BusStop = require("../models/busStop");


exports.findBusByStops = async (req, res) => {
  try {
    const fromStopName = req.params.from;
    const toStopName = req.params.to;

    const fromStop = await BusStop.findOne({ name: fromStopName });
    const toStop = await BusStop.findOne({ name: toStopName });
    console.log(fromStop,toStop)
    if (!fromStop || !toStop) {
      return res.status(404).json({ message: 'Bus stops not found' });
    }
    console.log(fromStop._id, toStop._id)

    const bus = await Bus.findOne({
      
      route: { $all: [fromStop._id, toStop._id] },
    });
    console.log(bus)
    if (!bus) {
      return res.status(404).json({ message: 'No bus found for the given stops' });
    }

    res.json({ busName: bus.name });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bus information' });
  }
}

exports.createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error creating bus' });
  }
};

exports.getBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error retrieving bus' });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(updatedBus);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bus' });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bus' });
  }
};

exports.listBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving buses' });
  }
};