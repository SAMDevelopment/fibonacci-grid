import { detectFibonacciSequences } from './fibonacci'

export default class Grid {
  width = 1
  height = 1
  rows = []
  columns = []

  constructor (width, height) {
    this.width = width
    this.height = height

    this._createRowsAndColumnsWithCells()
  }

  _createRowsAndColumnsWithCells () {
    for (let i = 1; i <= this.height; i++) {
      const row = []

      for (let j = 1; j <= this.width; j++) {
        const cell = this._createCell(j, i)

        row.push(cell)

        if (i === 1) {
          this.columns.push([cell])
        } else {
          this.columns[j - 1].push(cell)
        }
      }

      this.rows.push(row)
    }
  }

  _createCell (x, y) {
    return {
      x,
      y,
      count: 0,
      updated: false,
      success: false,
    }
  }

  /**
   * Get all cells in the same row and column as the passed cell.
   */
  getLinkedCells (targetCell) {
    const rowCells = this.rows[targetCell.y - 1]
    const columnCells = this.columns[targetCell.x - 1].filter(cell => cell.y !== targetCell.y)

    return [
      ...rowCells,
      ...columnCells,
    ]
  }

  _getSuccessCellsForCellSequences (cellSequences, minLength) {
    const matchedCells = []

    cellSequences.forEach(cellSequence => {
      const sequence = cellSequence.map(cell => cell.count)
      const detectedSequences = detectFibonacciSequences(sequence, minLength)
      const matchedIndexes = [].concat(...detectedSequences)

      matchedIndexes.forEach(index => {
        if (!matchedCells.includes(cellSequence[index])) {
          matchedCells.push(cellSequence[index])
        }
      })
    })

    return matchedCells
  }

  getSuccessCells (minLength = 2) {
    const successCells = []

    const reversedRows = [...this.rows].map(row => [...row].reverse())
    const reversedColumns = [...this.columns].map(column => [...column].reverse())

    const allMatches = [
      ...this._getSuccessCellsForCellSequences(this.rows, minLength),
      ...this._getSuccessCellsForCellSequences(this.columns, minLength),
      ...this._getSuccessCellsForCellSequences(reversedRows, minLength),
      ...this._getSuccessCellsForCellSequences(reversedColumns, minLength),
    ]

    allMatches.forEach(cell => {
      if (!successCells.includes(cell)) {
        successCells.push(cell)
      }
    })

    return successCells
  }

  async triggerUpdateAnimation (cells, animationDuration) {
    cells.forEach(cell => cell.updated = true)

    // Wait for the cells to turn yellow.
    await new Promise(resolve => setTimeout(() => {
      cells.forEach(cell => cell.updated = false)
      resolve()
    }, animationDuration))

    // Wait for the cells to turn white again.
    await new Promise(resolve => setTimeout(resolve, animationDuration))
  }

  /**
   * This method is a copy of update on purpose. Want to be able to change the
   * update behavior without changing this one.
   */
  async triggerSuccessAnimation (cells, animationDuration) {
    cells.forEach(cell => cell.success = true)

    // Wait for the cells to turn green.
    await new Promise(resolve => setTimeout(() => {
      cells.forEach(cell => cell.success = false)
      resolve()
    }, animationDuration))

    // Wait for the cells to turn white again.
    await new Promise(resolve => setTimeout(resolve, animationDuration))
  }
}
