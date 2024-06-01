const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// require('./db');
const PORT = process.env.PORT || 8090;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB14', err);
});

app.get('/', (req, res) => {
    res.send('products api running new project deploy');
});

app.get('/ping', (req, res) => {
    res.send('PONG')
});
// /products
app.use('/Granite', productRoutes);
// /users
app.use('/users', userRoutes);

app.listen(8090, () => {
    console.log('Server is listenin on PORT :' + PORT);
})