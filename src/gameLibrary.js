const {
  cartesianSquare,
  cartesianProduct,
  justifyLength,
  range,
  subtractPositions,
  isNotOrigin,
  addPositions
} = require('./util.js');

const findAliveposition = function ({ world, dimensions }) {
  let alivePosition = [];
  let height = dimensions[0];
  let width = dimensions[1];
  cartesianProduct(range(height), range(width)).map(position => {
    world[position[0]][position[1]] == 1 &&
      alivePosition.push([position[0], position[1]]);
  });
  return alivePosition;
};

const updateWorld = function (world, currGeneration) {
  currGeneration.map(position => {
    isValidPosition(world, position) && (world[position[0]][position[1]] = 1);
  });
  return world;
};

const extractSize = function ({ bottomRight, topLeft }) {
  let height = bottomRight[0] - topLeft[0] + 1;
  let width = bottomRight[1] - topLeft[1] + 1;
  return [height, width];
};

const makeWorld = function (dimensions) {
  let height = dimensions[0];
  let width = dimensions[1];
  let world = new Array(height).fill('1');
  world = world.map(x => new Array(width).fill('*').map(x => 0));
  return world;
};

const makeGrid = function (world) {
  let gridArray = [];
  for (let index = 0; index < world.length; index++) {
    gridArray[index] = generateRow(world[index]);
  }
  return gridArray.join('\n');
};

const generateRow = function (world) {
  world = world.map(x => justifyLength(x, 3) + '|');
  return '|' + world.join('');
};

const findNeighboursPositions = function (currPosition) {
  return cartesianSquare([-1, 0, 1])
    .filter(isNotOrigin)
    .map(delta => addPositions(delta, currPosition));
};

const isValidPosition = function (world, currPosition) {
  let row = currPosition[0];
  let column = currPosition[1];
  return world[row] != undefined && world[row][column] != undefined;
};

const findNeighbours = function (world, currPosition) {
  let neighboursPositions = findNeighboursPositions(currPosition);
  let neighbours = [];
  return neighboursPositions
    .filter(isValidPosition.bind(null, world))
    .map(position => world[position[0]][position[1]]);
};

const countAliveNeighbours = function (list, position) {
  return findNeighbours(list, position).filter(x => x == 1).length;
};

const extractValidPosition = function (alivePosition, topLeft, operator) {
  let operations = { '+': addPositions, '-': subtractPositions };
  return (alivePosition = alivePosition.map(dimensions =>
    operations[operator](dimensions, topLeft)
  ));
};

const decideState = function (length, cell) {
  let rules = ['0', '0', cell, '1', '0', '0', '0', '0', '0'];
  return rules[length];
};

const generateNextWorld = function ({ dimensions, world }) {
  let nextWorld = makeWorld(dimensions);
  for (let row = 0; row < dimensions[0]; row++) {
    for (let column = 0; column < dimensions[1]; column++) {
      let cell = world[row][column];
      let aliveNeighboursCount = countAliveNeighbours(world, [row, column]);
      nextWorld[row][column] = decideState(aliveNeighboursCount, cell);
    }
  }
  return nextWorld;
};

module.exports = {
  makeGrid,
  makeWorld,
  findNeighbours,
  findAliveposition,
  decideState,
  findNeighboursPositions,
  extractSize,
  updateWorld,
  isValidPosition,
  countAliveNeighbours,
  generateNextWorld,
  extractValidPosition,
  generateRow
};
