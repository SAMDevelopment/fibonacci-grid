import { detectFibonacciSequences, isNextFibonacciNumber, isFibonacciNumber } from '../../../src/utils/fibonacci'

describe('detectFibonacciSequences', () => {
  it('returns an array of found sequence indexes', () => {
    const sequence = [2, 3, 5, 8, 13, 4, 0, 1, 1, 2, 3, 21, 34, 55, 89, 144, 5]

    const matches = detectFibonacciSequences(sequence, 2)

    expect(matches).toHaveLength(3)

    expect(matches[0]).toEqual([0, 1, 2, 3, 4])
    expect(matches[1]).toEqual([6, 7, 8, 9, 10])
    expect(matches[2]).toEqual([11, 12, 13, 14, 15])
  })

  it('only returns matches of the specified minimum length', () => {
    const sequence = [3, 1, 2, 3, 5, 13, 21, 34, 55, 89, 144, 5]

    const matches = detectFibonacciSequences(sequence, 5)

    expect(matches).toHaveLength(1)
    expect(matches[0]).toEqual([5, 6, 7, 8, 9, 10])
  })

  it('also matches a single complete sequence', () => {
    const sequence = [1, 1, 2, 3, 5, 8]

    const matches = detectFibonacciSequences(sequence, 2)

    expect(matches).toHaveLength(1)
    expect(matches[0]).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('does not match more than two 1\'s in a row', () => {
    const sequence = [1, 1, 1, 1, 1, 1]

    const matches = detectFibonacciSequences(sequence, 3)

    expect(matches).toHaveLength(0)
  })

  it('does not match 0, 1, 2 (single 1)', () => {
    const sequence = [0, 1, 2, 3, 5]

    const matches = detectFibonacciSequences(sequence, 5)

    expect(matches).toHaveLength(0)
  })

  it('does match 1, 2, 3 (single 1 is fine because no 0)', () => {
    const sequence = [0, 1, 2, 3, 0, 0]

    const matches = detectFibonacciSequences(sequence, 3)

    expect(matches).toHaveLength(1)
  })

  it('reuses a number that was not part of the previous sequence as the start of a new one', () => {
    const sequence = [1, 1, 2, 5, 8, 13, 21, 34]

    const matches = detectFibonacciSequences(sequence, 2)

    expect(matches).toHaveLength(2)
    expect(matches[0]).toEqual([0, 1, 2])
    expect(matches[1]).toEqual([3, 4, 5, 6, 7])
  })

  it('returns an empty array when no sequences were found', () => {
    const sequence = [1, 2, 3, 4, 5]

    const matches = detectFibonacciSequences(sequence, 5)

    expect(matches).toHaveLength(0)
  })
})

describe('isFibonacciNumber', () => {
  it('determines if a number belongs to the fibonacci sequence', () => {
    expect(isFibonacciNumber(5)).toBe(true)
    expect(isFibonacciNumber(144)).toBe(true)
    expect(isFibonacciNumber(1000)).toBe(false)
  })
})

describe('isNextFibonacciNumber', () => {
  it('Checks if two numbers follow each other in a fibonacci sequence', () => {
    expect(isNextFibonacciNumber(0, 1)).toBe(true)
    expect(isNextFibonacciNumber(1, 1)).toBe(true)
    expect(isNextFibonacciNumber(1, 2)).toBe(true)
    expect(isNextFibonacciNumber(5, 8)).toBe(true)
    expect(isNextFibonacciNumber(55, 89)).toBe(true)

    expect(isNextFibonacciNumber(0, 0)).toBe(false)
    expect(isNextFibonacciNumber(2, 5)).toBe(false)
    expect(isNextFibonacciNumber(55, 88)).toBe(false)
  })

  it('Does not allow more than two 1\'s', () => {
    expect(
      isNextFibonacciNumber(1, 1, 1),
    ).toBe(false)
  })

  it('a 2 does not come after a 0 and a single 1', () => {
    expect(
      isNextFibonacciNumber(1, 2, 0),
    ).toBe(false)
  })
})
