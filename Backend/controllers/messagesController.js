const Message = require("../models/messagesModel");

exports.sendMessage = async (req, res) => {
    try {
        const { content, receiver } = req.body;
  
      const message = await Message.create({
        sender: req.currentUser._id,
        receiver: receiver,
        content,
      });
  
      res.status(201).json({ status: "success", data: message });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  };
  

exports.getMessages = async (req, res) => {
  try {
    const currentUserId = req.currentUser._id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ status: "success", data: messages });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

