const express = require('express');

const app = express();

// Init Middleware
app.use(express.json({ extended: true }));

// Define route
app.use('/api/calculator', require('./routes/api/calculator'));

const PORT = process.env.SECOND_SERVER_PORT || 5001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
