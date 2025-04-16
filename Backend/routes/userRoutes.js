const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/users", userController.getAllUsers);
router.put("/profile/update",userController.protectSystem,userController.updateProfile);
router.get("/profile",userController.protectSystem,userController.getCurrentUser);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword/:token", userController.resetPassword);
router.patch("/updatePassword", userController.protectSystem, userController.updatePassword);

router.get('/me', userController.protectSystem, userController.getCurrentUser);

module.exports = router;
