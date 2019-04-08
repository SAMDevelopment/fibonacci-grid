import Grid from '../../../src/utils/Grid'

describe('Grid', () => {
  it('creates the correct number of rows and columns', () => {
    const grid = new Grid(3, 5)

    expect(grid.rows).toHaveLength(5)
    grid.rows.forEach(row =>
      expect(row).toHaveLength(3),
    )

    expect(grid.columns).toHaveLength(3)
    grid.columns.forEach(column =>
      expect(column).toHaveLength(5),
    )
  })

  it('creates cells with correct properties', () => {
    const grid = new Grid(6, 5)
    const cell = grid.rows[4][3]

    expect(cell.x).toBe(4)
    expect(cell.y).toBe(5)
    expect(cell.count).toBe(0)
    expect(cell.updated).toBe(false)
    expect(cell.success).toBe(false)
  })

  it('retrieves all cells connected to a passed cell', () => {
    const grid = new Grid(3, 3)
    /**
     * | | | |
     * | | |x|
     * | | | |
     */
    const targetCell = grid.rows[1][2]

    const cells = grid.getLinkedCells(targetCell)

    /**
     * | | |x|
     * |x|x|x|
     * | | |x|
     */
    expect(cells).toHaveLength(5)
    expect(cells.find(cell => cell.y === 1 && cell.x === 3))
    expect(cells.find(cell => cell.y === 2 && cell.x === 1))
    expect(cells.find(cell => cell.y === 2 && cell.x === 2))
    expect(cells.find(cell => cell.y === 2 && cell.x === 3))
    expect(cells.find(cell => cell.y === 3 && cell.x === 3))
  })

  it('triggers update animation for cells', () => {
    jest.useFakeTimers()
    const grid = new Grid(3, 3)
    const control = grid.rows[0][0]
    const cells = [
      grid.rows[1][1],
      grid.rows[1][2],
    ]

    // Updated should start with false.
    cells.forEach(cell => {
      expect(cell.updated).toBe(false)
    })
    expect(control.updated).toBe(false)

    grid.triggerUpdateAnimation(cells, 200)

    // Updated should have been set to true.
    cells.forEach(cell => {
      expect(cell.updated).toBe(true)
    })
    expect(control.updated).toBe(false)

    // Updated should still be true before animation duration passed.
    jest.advanceTimersByTime(190)
    cells.forEach(cell => {
      expect(cell.updated).toBe(true)
    })
    expect(control.updated).toBe(false)

    // Updated should be false again after animation duration.
    jest.advanceTimersByTime(10)
    cells.forEach(cell => {
      expect(cell.updated).toBe(false)
    })
    expect(control.updated).toBe(false)
  })

  it('triggers success animation for cells', () => {
    jest.useFakeTimers()
    const grid = new Grid(3, 3)
    const control = grid.rows[0][0]
    const cells = [
      grid.rows[1][1],
      grid.rows[1][2],
    ]

    // Success should start with false.
    cells.forEach(cell => {
      expect(cell.success).toBe(false)
    })
    expect(control.success).toBe(false)

    grid.triggerSuccessAnimation(cells, 200)

    // Success should have been set to true.
    cells.forEach(cell => {
      expect(cell.success).toBe(true)
    })
    expect(control.success).toBe(false)

    // Success should still be true before animation duration passed.
    jest.advanceTimersByTime(190)
    cells.forEach(cell => {
      expect(cell.success).toBe(true)
    })
    expect(control.success).toBe(false)

    // Success should be false again after animation duration.
    jest.advanceTimersByTime(10)
    cells.forEach(cell => {
      expect(cell.success).toBe(false)
    })
    expect(control.success).toBe(false)
  })

  it('retrieves all cells that are part of a fibonacci sequence', () => {
    /**
     * |1 |1 |2 |1 |1 |0 |    |x |x |x |x |x |x |
     * |0 |0 |3 |5 |13|0 |    |0 |0 |x |x |0 |0 |
     * |0 |1 |5 |3 |2 |0 |    |0 |0 |x |x |x |0 |
     * |3 |5 |8 |2 |3 |5 |    |x |x |x |x |x |x |
     * |0 |1 |1 |2 |3 |0 |    |x |x |x |x |x |0 |
     */
    const grid = _getFibonacciGrid()

    const successCells = grid.getSuccessCells(3)

    expect(successCells).toHaveLength(22)
  })

  /**
   * |1 |1 |2 |1 |1 |0 |    |x |x |x |x |x |x |
   * |0 |0 |3 |5 |13|0 |    |0 |0 |x |x |0 |0 |
   * |0 |1 |5 |3 |2 |0 |    |0 |0 |x |x |x |0 |
   * |3 |5 |8 |2 |3 |5 |    |x |x |x |x |x |x |
   * |0 |1 |1 |2 |3 |0 |    |x |x |x |x |x |0 |
   */
  function _getFibonacciGrid () {
    const grid = new Grid(6, 5)
    const rowValues = [
      [1, 1, 2, 1, 1, 0],
      [0, 0, 3, 5, 13, 0],
      [0, 1, 5, 3, 2, 0],
      [3, 5, 8, 2, 3, 5],
      [0, 1, 1, 2, 3, 0],
    ]

    grid.rows.forEach((row, rowNr) => {
      row.forEach((cell, cellNr) => {
        if (rowValues[rowNr] !== undefined && rowValues[rowNr][cellNr] !== undefined) {
          cell.count = rowValues[rowNr][cellNr]
        }
      })
    })

    return grid
  }
})
