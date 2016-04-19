angular.module('discountCalc', [])
  .controller('CalcController', function() {
    var cc = this;

    cc.products = [
      {name: 'Телефон',    price: 100},
      {name: 'Магнитофон', price: 200},
      {name: 'Миелофон',   price: 400},
    ];
    cc.totalDiscount = 7;

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
      product.discount = discount;
      product.discountPrice = product.price - product.discount;
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

      // The most expensive product
      var leadProduct = cc.products.reduce(function(lead, current) {
        return lead ? lead.price > current.price ? lead : current : current;
      });

      cc.applyDiscountTo(leadProduct, leadProduct.discount + discountRem);
    };

    cc.applyDiscount();
  });
