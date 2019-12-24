module.exports.nested_encoder = function nested_encoder(
  queryObj,
  nesting = ``
) {
  const pairs = Object.entries(queryObj).map(([key, val]) => {
    // Handle the nested, recursive case, where the value to encode is an object itself
    if (typeof val === 'object' && key === 'queries') {
      return nested_encoder(val, nesting + `${key}.1.`);
    } else if (
      val !== null &&
      val !== undefined &&
      val !== '' &&
      typeof val === 'object'
    ) {
      return nested_encoder(val, nesting + `${key}.`);
    } else if (val === '' || typeof val === 'undefined') {
      return;
    } else {
      // Handle base case, where the value to encode is simply a string.
      return [nesting + key, val].join('=');
    }
  });
  return pairs.join('&');
};
