const Visitor = require("../models/Visitor");

exports.addVisitor = async (req, res) => {
  try {
    const visitor = new Visitor(req.body);
    await visitor.save();
    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkOutVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const now = new Date().toLocaleTimeString();

    const visitor = await Visitor.findByIdAndUpdate(
      id,
      { checkOutTime: now },
      { new: true }
    );

    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
