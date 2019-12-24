// const express = require('express');
// const router = express.Router();
// const config = require('config');
// const request = require('request');
// // const NewsAPI = require('newsapi');
// // const newsapi = new NewsAPI(config.get('news_API'));

// router.get('/', async (req, res) => {
//     try {
//         const options = {
//             uri: `https://newsapi.org/v2/everything?q=detroit+real+estate&apiKey=${config.get('news_API')}`,
//             method: 'GET'
//           };
      
//           request(options, (error, response, body) => {
//             console.log('OPTIONS: ', options);
//             if (error) console.log(error);
      
//             if (response.statusCode !== 200) {
//               console.log(response.statusCode);
//               console.log(response.statusMessage);
//               return res
//                 .status(response.statusCode)
//                 .json({ msg: response.statusMessage });
//             }
//             res.json(JSON.parse(body));
//           });
        
//     } catch (error) {
//         console.log(error);
//     }
// });

// module.exports = router;