const cartesianProduct = function (set1, set2) {
  let cartesianProduct = [];
  set1.forEach(element1 => {
    set2.forEach(element2 => {
      cartesianProduct.push([element1, element2]);
    });
  });
  return cartesianProduct;
};

const cartesianSquare = function (set) {
  return cartesianProduct(set, set);
};

const addPositions = function (position1, position2) {
  return [position1[0] + position2[0], position1[1] + position2[1]];
};

const range = function (limit) {
  let count = 0;
  return new Array(limit).fill('*').map(number => count++);
};

const subtractPositions = function (position1, position2) {
  return [position1[0] - position2[0], position1[1] - position2[1]];
};

const isNotOrigin = function (position) {
  return !(position[0] == 0 && position[1] == 0);
};

const justifyLength = function (text, width) {
  let spaceWidth = width - text.toString().length;
  return text + repeatSymbol(spaceWidth, ' ');
};

const repeatSymbol = function (times, symbol) {
  times = Math.max(0, times);
  return new Array(times).fill(symbol).join('');
};

module.exports = {
  cartesianSquare,
  cartesianProduct,
  addPositions,
  subtractPositions,
  justifyLength,
  repeatSymbol,
  range,
  isNotOrigin
};
