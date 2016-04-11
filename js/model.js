var totalDiscount = 0;
var products      = [];

function applyDisocunt() {
  // If there are no products in cart - nothing to do
  if (!products.length) return;

  // Total price of products is used to count every product discount proportion
  var totalPrice = products.reduce(function (t, p) {
    return t + p.price;
  }, 0);
  // Discount remainder will be apply to the most expensive product
  var discountRem = totalDiscount;

  products.forEach(function (p) {
    // Current product discount
    var discount = Math.floor(totalDiscount*p.price/totalPrice);

    p.applyDiscount(discount);
    discountRem -= discount;
  });

  // I wish to sort products to get the most expensive product
  products.sort(function (p1, p2) {
    return p2.price - p1.price;
  })[0].applyDiscount(products[0].discount + discountRem);
}
