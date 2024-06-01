const ensureAuthenticated = require('../auth');

const express =require('express');
const router=express.Router()
const productController= require('../conrollers/productController')
const Product= require('../models/Product')


//very importants in backend methods like get, post, put, delete

router.post('/add-emp',productController.createProduct)
router.get("/allemployees",productController.getProducts)

module.exports= router