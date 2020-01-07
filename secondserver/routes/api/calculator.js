require('dotenv').config({ path: require('find-config')('.env') });
const express = require('express');
const router = express.Router();
const request = require('request');
const { check, validationResult } = require('express-validator');
const { nested_encoder } = require('../../utils/nested_encoder');

// @route  GET /api/calculator
// @desc   Get current Mortgage rate and APR
// @access Public
router.get('/', async (req, res) => {
  // TODO put in form data checks on the backend w/ express validator

  const params = {
    partnerId: process.env.PARTNER_ID,
    queries: {
      stateAbbreviation: req.query.stateAbbr,
      program: req.query.program,
      loanType: req.query.loanType,
      creditScoreBucket: req.query.creditScore,
      loanAmountBucket: req.query.loanAmountBucket,
      loanToValueBucket: req.query.loanToValueBucket,
      // This member overrides the "stateAbbreviation", "loanAmountBucket",
      // and "loanToValueBucket" members.
      propertyBucket: {
        propertyValue: req.query.propertyValue,
        loanAmount: req.query.loanAmount,
        location: {
          zipCode: req.query.zipcode
        }
      }
    }
  };

  try {
    const first_step = nested_encoder(params);

    const remove_repeating_ampersands = str => {
      return str.replace(/&&&/gi, '&');
    };

    const second_step = remove_repeating_ampersands(first_step);

    const remove_end_ampersand = str => {
      if (str.endsWith('&')) {
        new_str = str.slice(0, -1);
        return remove_end_ampersand(new_str);
      } else {
        return str;
      }
    };

    const fin_step = remove_end_ampersand(second_step);

    const options = {
      uri: `https://mortgageapi.zillow.com/getCurrentRates?${fin_step}`,
      method: 'GET'
    };

    request(options, (error, response, body) => {
      console.log('OPTIONS: ', options);
      if (error) console.log(error);

      if (response.statusCode !== 200) {
        console.log(response.statusCode);
        console.log(response.statusMessage);
        return res
          .status(response.statusCode)
          .json({ msg: response.statusMessage });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.log('ERROR.MESSAGE: ' + error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
