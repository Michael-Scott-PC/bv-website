// const express = require('express');
// // const path = require('path');

// const app = express();

// // Init Middleware
// app.use(express.json({ extended: true }));

// // Define route
// app.use('/api/calculator', require('./routes/api/calculator'));
// // app.use('/api/news', require('./routes/api/news'));

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('../frontend/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server started on port ${PORT}`));
