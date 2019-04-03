import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import nextGeneration from './gameOfLife'

class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.initialize();
    this.bounds = { topLeft: [0, 0], bottomRight: [this.props.size, this.props.size] };
    this.state = {
      aliveCells: []
    }
  }

  initialize() {
    this.initializeAliveCell = this.initializeAliveCell.bind(this);
    this.start = this.start.bind(this);
    this.nextGeneration = nextGeneration.bind(this);
    this.displayNextGeneration = this.displayNextGeneration.bind(this);
  }

  start() {
    setInterval(this.displayNextGeneration, 500);
  }

  displayNextGeneration() {
    this.state.aliveCells.map(cell =>
      document.getElementById(cell.join('_')).className = 'cell');

    let nextGeneration = this.nextGeneration(this.state.aliveCells, this.bounds);

    nextGeneration.map(cell =>
      document.getElementById(cell.join('_')).className = 'active-cell');
    this.setState({ aliveCells: nextGeneration })
  }

  initializeAliveCell(event) {
    const selectedCell = event.target.id;
    const cell = selectedCell.split('_');
    document.getElementById(selectedCell).className = 'active-cell';
    let aliveCells = this.state.aliveCells;
    aliveCells.push(cell);
    this.setState({ aliveCells });
  }

  createRow(rowIndex) {
    let columns = [];
    for (let column = 0; column < this.props.size; column++) {
      const id = rowIndex + '_' + column;
      columns.push(<td className='cell' key={id} id={id} onClick={this.initializeAliveCell} />
      );
    }
    return columns;
  }

  renderTable() {
    let table = [];
    for (let row = 0; row < this.props.size; row++) {
      table.push(<tr key={row}>{this.createRow(row)}</tr>);
    }
    return table;
  }

  render() {
    return (
      <div>
        <table>{this.renderTable()}</table>
        <button onClick={this.start}>Start</button>
      </div>
    )
  }
}

ReactDOM.render(<GameOfLife size={15} />, document.getElementById('root'));

