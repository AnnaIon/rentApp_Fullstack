const Apartment = require("../models/apartmentModel");
const User = require("../models/userModel");

exports.addApartment = async (req, res) => {
  try {
    const currentUser = req.currentUser;
    const newApartment = await Apartment.create({
      ...req.body,
      createdBy: currentUser.id,
    });

    await User.findByIdAndUpdate(currentUser.id, {
      $push: { apartments: newApartment._id },
    });
    const populatedApartment = await Apartment.findById(
      newApartment._id
    ).populate("createdBy", "_id");
    return res
      .status(201)
      .json({ status: "success", data: populatedApartment });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

exports.getAllApartments = async (req, res) => {
  try {
    let apartments = await Apartment.find();
    res.status(200).json({
      status: "succes",
      data: apartments,
      noOfApartments: apartments.length,
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

exports.getApartmentById = async(req,res) =>{
    try{
        let id = req.params.id;
        let apartment = await Apartment.find({_id: id});
        res.status(201).json({status: "success", data: apartment})

    }catch(err){
        res.status(400).json({ status: "failed", message: err.message });

    }
}

exports.updateApartment = async (req, res) => {
    try {
      const updatedApartment = await Apartment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!updatedApartment) {
        return res.status(404).json({
          status: "failed",
          message: "Apartment not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: updatedApartment,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
  };

  exports.deleteApartment = async (req, res) => {
    try {
      const apartment = await Apartment.findById(req.params.id);
  
      if (!apartment) {
        return res.status(404).json({ status: "failed", message: "Apartment not found" });
      }
  
      const rawCreatedBy = apartment.createdBy;
      const apartmentCreatorId = rawCreatedBy?._id?.toString?.() || rawCreatedBy?.toString?.();
      const currentUserId = req.currentUser._id.toString();
  
      console.log("Apartment createdBy:", apartmentCreatorId);
      console.log("Current user:", currentUserId);
  
      if (!apartmentCreatorId || apartmentCreatorId !== currentUserId) {
        return res.status(403).json({
          status: "failed",
          message: "Unauthorized to delete this apartment",
        });
      }
  
      await apartment.deleteOne();
      return res.status(200).json({ status: "success", message: "Apartment deleted successfully." });
    } catch (err) {
      return res.status(400).json({ status: "failed", message: err.message });
    }
  };
  

exports.getUserApartments = async (req, res) => {
    try {
      const apartments = await Apartment.find({ createdBy: req.currentUser._id });
      res.status(200).json({ status: "success", data: apartments });
    } catch (err) {
      res.status(400).json({ status: "failed", message: err.message });
    }
  };


  exports.toggleFavorite = async (req, res) => {
    try {
      const apartment = await Apartment.findById(req.params.id);
      const userId = req.currentUser._id.toString();
  
      if (!apartment) {
        return res.status(404).json({ status: "failed", message: "Apartment not found" });
      }
  
      console.log("🏠 Apartment ID:", apartment._id.toString());
      console.log("👤 User trying to favorite:", userId);
      console.log("❤️ Already favorited by:", apartment.favoritedBy.map(id => id.toString()));
  
      const alreadyFavorited = apartment.favoritedBy
        .map(id => id.toString())
        .includes(userId);
  
      if (alreadyFavorited) {
        apartment.favoritedBy = apartment.favoritedBy.filter(
          (id) => id.toString() !== userId
        );
      } else {
        apartment.favoritedBy.push(userId);
      }
  
      await apartment.save();
      res.status(200).json({ status: "success", data: apartment });
    } catch (err) {
      console.error("Toggle favorite error:", err);
      res.status(400).json({ status: "failed", message: err.message });
    }
  };
  
  exports.getFavoriteApartments = async (req, res) => {
    try {
      if (!req.currentUser) {
        return res.status(401).json({ status: "failed", message: "User not authenticated." });
      }
  
      const userId = req.currentUser._id;
      const favorites = await Apartment.find({ favoritedBy: userId });
  
      res.status(200).json({ status: "success", data: favorites });
    } catch (err) {
      res.status(400).json({ status: "failed", message: err.message });
    }
  };
  
  
  
  
  exports.filterApartments = async (req, res) => {
    try {
      const {
        AZ,
        ZA,
        city,
        minAreaRange,
        maxAreaRange,
        minPriceRange,
        maxPriceRange,
      } = req.body;
  
      let query = {};
  
      if (city) {
        query.city = { $regex: new RegExp(city, "i") };
      }
      if (minAreaRange || maxAreaRange) {
        query.areaSize = {};
        if (minAreaRange) query.areaSize.$gte = Number(minAreaRange);
        if (maxAreaRange) query.areaSize.$lte = Number(maxAreaRange);
      }
      if (minPriceRange || maxPriceRange) {
        query.price = {};
        if (minPriceRange) query.price.$gte = Number(minPriceRange);
        if (maxPriceRange) query.price.$lte = Number(maxPriceRange);
      }
  
      let apartments = await Apartment.find(query);
  
      if (AZ) apartments.sort((a, b) => a.city.localeCompare(b.city));
      if (ZA) apartments.sort((a, b) => b.city.localeCompare(a.city));
  
      return res.status(200).json({ data: apartments });
    } catch (err) {
      console.error("Error filtering:", err);
      return res.status(500).json({ message: "Failed to filter apartments." });
    }
  };
  