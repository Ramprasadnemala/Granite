const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { date, DC_No, vehicleNo, materialType, transportName, sourcePlace,gross,tare ,net,loadingTime,unloadingTime,royalty,remarks} = req.body

        if (typeof materialType !== 'string') {
            return res.status(400).json({ error: 'Invalid materialType value. It must be a string.' });
        }

        const product = new Product({
            date,
            DC_No,
            vehicleNo,
            materialType,
            transportName,
            sourcePlace,
            gross,
            tare,
            net,
            loadingTime,
            unloadingTime,
            royalty,
            remarks
        })

        await product.save()
        res.status(201).json(product)
    } catch (error) {
        console.log("there is an error", error)
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.log("There is an error:", error)
        res.status(500).json({ message: "server error" })
    }
}

module.exports = { createProduct, getProducts }