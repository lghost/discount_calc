function Product(name, price) {
  // Model's data
  this.name     = name;
  this.price    = parseNatural(price);
  this.discount = 0;

  // View bindings
  this.nameNode          = document.createTextNode(this.name);
  this.priceNode         = document.createTextNode(this.price);
  this.discountPriceNode = document.createTextNode(this.price);

  // New data view nodes
  var table         = document.getElementById('products'),
      productName   = document.createElement('TD'),
      price         = document.createElement('TD'),
      discountPrice = document.createElement('TD'),
      tr            = document.createElement('TR');

  // Here we append table with data
  productName.appendChild(this.nameNode);
  price.appendChild(this.priceNode);
  discountPrice.appendChild(this.discountPriceNode);
  tr.appendChild(productName);
  tr.appendChild(price);
  tr.appendChild(discountPrice);
  table.appendChild(tr);
}

// Here we change data (in table)
Product.prototype.applyDiscount = function(discount) {
  this.discount = parseNatural(discount);
  this.discountPriceNode.nodeValue = this.price - this.discount;
};



function addProduct(form) {
  products.push(new Product(form.productName.value, form.price.value));

  // This global function is declared in model
  applyDisocunt();
}

function setDiscount(form) {
  totalDiscount = parseNatural(form.discount.value);

  applyDisocunt();
}
