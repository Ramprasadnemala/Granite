const mongoose = require("mongoose");

const ProductModel = new mongoose.Schema({
     // name, email, phone, city
     date: {
          type: String,
          required: true,
        },
        DC_No: {
          type: String,
          required: true,
        },
        vehicleNo: {
          type: String,
          required: true,
        },
        materialType: {
          type: String,
          required: true,
        },
        transportName: {
          type: String,
          required: true,
        },
        sourcePlace: {
          type: String,
          required: true,
        },
        gross: {
          type: Number,
          required: true,
        },
        tare: {
          type: Number,
          required: true,
        },
        net: {
          type: Number,
          required: true,
        },
        loadingTime: {
          type: String,
          required: true,
        },
        unloadingTime: {
          type: String,
          required: true,
        },
        royalty: {
          type: Number,
          required: true,
        },
        remarks: {
          type: String,
          required: true,
        },
})

module.exports = mongoose.model('products', ProductModel)