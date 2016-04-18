angular.module('discountCalc', [])
  .controller('CalcController', function() {
    var cc = this;

    cc.products = [{name: 'test', price: 100, discountPrice: 90}];
    cc.totalDiscount = 0;

    cc.addProduct = function() {
      cc.products.push({
        name: cc.productName,
        price: parseNatural(cc.productPrice),
        discountPrice: 0
      });
      cc.applyDiscount();
    };

    cc.changeDiscount = function() {
      cc.totalDiscount = parseNatural(cc.totalDiscount);
      cc.applyDiscount();
    };

    cc.applyDiscountTo = function(product, discount) {
      //cc.applyDiscount();
    };

    cc.applyDiscount = function() {
      // If there are no products in cart - nothing to do
      if (!cc.products.length) return;

      // Total price of products is used to count every product discount proportion
      var totalPrice = cc.products.reduce(function (t, p) {
        return t + p.price;
      }, 0);
      // Discount remainder will be apply to the most expensive product
      var discountRem = cc.totalDiscount;

      cc.products.forEach(function (p) {
        // Current product discount
        var discount = Math.floor(cc.totalDiscount*p.price/totalPrice);

        cc.applyDiscountTo(p, discount);
        discountRem -= discount;
      });

      // I wish to sort products to get the most expensive product
      cc.applyDiscountTo(cc.products.sort(function (p1, p2) {
        return p2.price - p1.price;
      })[0], cc.products[0].discount + discountRem);
    };
  });
