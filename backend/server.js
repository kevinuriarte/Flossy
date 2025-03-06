const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const openDentalRoutes = require('./routes/openDentalRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/opendental', openDentalRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
