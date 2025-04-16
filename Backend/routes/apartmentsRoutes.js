const express = require("express");
const apartmentController = require("../controllers/apartmentController");
const userController = require('../controllers/userControllers');
const router = express.Router();


router.post("/addApartment", userController.protectSystem, apartmentController.addApartment);
router.get("/getAllApartments",apartmentController.getAllApartments);
router.get("/userApartments", userController.protectSystem, apartmentController.getUserApartments);
router.get("/apartment/:id", userController.protectSystem, apartmentController.getApartmentById);
router.patch("/updateApartment/:id", userController.protectSystem, apartmentController.updateApartment);
router.get("/favorites", userController.protectSystem, apartmentController.getFavoriteApartments);
router.patch("/apartment/favorite/:id", userController.protectSystem, apartmentController.toggleFavorite);
router.post("/filterApartments", apartmentController.filterApartments);

router.delete("/deleteApartment/:id", userController.protectSystem, apartmentController.deleteApartment);

module.exports = router;