const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messagesController");
const { protectSystem } = require("../controllers/userControllers");

router.post("/sendMessage", protectSystem, messageController.sendMessage);
router.get("/:userId", protectSystem, messageController.getMessages);

module.exports = router;
