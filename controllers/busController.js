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
      return res.status(200).json({ message: 'Bus stops not found' });
    }
    console.log(fromStop._id, toStop._id)

    const busesWithRoute = await Bus.find({
      route: {
        $all: [fromStop._id, toStop._id],
      },
    });
    // const filteredBuses = busesWithRoute.filter((bus) => {
    //   const fromIndex = bus.route.indexOf(fromStop._id);
    //   const toIndex = bus.route.indexOf(toStop._id);
    //   return fromIndex !== -1 && toIndex !== -1 && fromIndex > toIndex;
    // });
    if (busesWithRoute.length === 0) {
      return res.status(200).json({ message: 'No buses found for the given stops' });
    }

    res.json({
      buses: busesWithRoute.map((bus) => ({ id: bus._id, name: bus.name })),
    });
  } catch (error) {
    console.log(error)
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
    const bus = await Bus.findById(req.params.id).populate('route', 'name');
    if (!bus) {
      return res.status(200).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving bus' });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBus) {
      return res.status(200).json({ message: 'Bus not found' });
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
      return res.status(200).json({ message: 'Bus not found' });
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