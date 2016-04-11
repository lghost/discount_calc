// Convert any number to natrual
function parseNatural(number) {
  var natural = parseInt(number) || 0;

  return natural > 0 ? natural : 0;
}
