export const state_choices = {
  'default(US)': 'US',
  US: 'US',
  AL: 'AL',
  AK: 'AK',
  AZ: 'AZ',
  AR: 'AR',
  CA: 'CA',
  CO: 'CO',
  CT: 'CT',
  DE: 'DE',
  DC: 'DC',
  FL: 'FL',
  GA: 'GA',
  HI: 'HI',
  ID: 'ID',
  IL: 'IL',
  IN: 'IN',
  IA: 'IA',
  KS: 'KS',
  KY: 'KY',
  LA: 'LA',
  ME: 'ME',
  MD: 'MD',
  MA: 'MA',
  MI: 'MI',
  MN: 'MN',
  MS: 'MS',
  MO: 'MO',
  MT: 'MT',
  NE: 'NE',
  NV: 'NV',
  NH: 'NH',
  NJ: 'NJ',
  NM: 'NM',
  NY: 'NY',
  NC: 'NC',
  ND: 'ND',
  OH: 'OH',
  OK: 'OK',
  OR: 'OR',
  PA: 'PA',
  RI: 'RI',
  SC: 'SC',
  SD: 'SD',
  TN: 'TN',
  TX: 'TX',
  UT: 'UT',
  VT: 'VT',
  VA: 'VA',
  WA: 'WA',
  WV: 'WV',
  WI: 'WI',
  WY: 'WY'
};

// export const programs = {
//   '30-Year Fixed': 'Fixed30Year',
//   '30-Year Fixed FHA': 'Fixed30Year',
//   '30-Year Fixed VA': 'Fixed30Year',
//   '15-Year Fixed': 'Fixed15Year',
//   '5-Year ARM': 'ARM5'
// };

export const programs = {
  '30-Year Fixed': '30-Year Fixed',
  '30-Year Fixed FHA': '30-Year Fixed FHA',
  '30-Year Fixed VA': '30-Year Fixed VA',
  '15-Year Fixed': '15-Year Fixed',
  '5-Year ARM': '5-Year ARM'
};

export const loanTypes = {
  Conventional: 'Conventional',
  FHA: 'FHA',
  VA: 'VA'
};

// export const credit_range = {
//   default: 'default',
//   '<680': 'Low',
//   '680-740': 'High',
//   '740': 'VeryHigh'
// };

export const credit_range = {
  'default(=>740)': 'VeryHigh',
  'equal to or less than 680': 'Low',
  '680-740': 'High',
  'equal to or greater than 740': 'VeryHigh'
};
