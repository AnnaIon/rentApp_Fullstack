const mongoose = require("mongoose");
const template = mongoose.Schema;
const ApartmentSchema = new template({
  title: {
    type: String,
    required: [true, "A product must have a title."],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[A-Z]/.test(value);
      },
      message: "The title must start with an uppercase.",
    },
  },
  city: {
    type: String,
    required: [true, "A product must have a city."],
  },
  streetName: {
    type: String,
    required: [true, "A product must have a street name."],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price."],
    min: [0, "Price must be above 0RON."],
  },
  areaSize: {
    type: Number,
    required: [true, "A product must have a area size."],
    min: [0, "Price must be above 0m."],
  },
  yearBuild: {
    type: Date,
    required: [true, "Please enter the year the apartment was built."],
  },
    hasAC: {
    type: Boolean,
    required: [true, "You must specify whether the apartment has AC."],
  },
  favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  createdBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true }
  
});

ApartmentSchema.pre(/^find/, function (next) {
  this.populate({ path: "createdBy", select: "_id" });
  next();
});


ApartmentSchema.pre("save", function (next) {
  console.log("Document is in pending.");
  next();
});

ApartmentSchema.post("save", function (doc, next) {
  console.log("A new document was created", doc);
  next();
});

module.exports = mongoose.model('apartments', ApartmentSchema)