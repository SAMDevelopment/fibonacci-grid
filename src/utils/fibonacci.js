const _fibonacciSequence = [0, 1, 1]

function _incrementFibonacciSequenceTo (number) {
  let highest = _fibonacciSequence[_fibonacciSequence.length - 1]

  while (highest < number) {
    const last = _fibonacciSequence[_fibonacciSequence.length - 1]
    const secondToLast = _fibonacciSequence[_fibonacciSequence.length - 2]

    highest = last + secondToLast
    _fibonacciSequence.push(highest)
  }
}

export function isFibonacciNumber (number) {
  _incrementFibonacciSequenceTo(number)

  return _fibonacciSequence.includes(number)
}

export function isNextFibonacciNumber (current, next, previous = null) {
  if (isFibonacciNumber(current) === false || isFibonacciNumber(next) === false) {
    return false
  }

  // Exception because 1 is represented twice in the sequence.
  if (current === 1 && next === 2 && previous !== 0) {
    return true
  }

  // Don't allow more than two 1's.
  if (current === 1 && next === 1 && previous === 1) {
    return false
  }

  const currentIndex = _fibonacciSequence.indexOf(current)

  return next === _fibonacciSequence[currentIndex + 1]
}

export function detectFibonacciSequences (sequence, minLength = 2) {
  const matches = []
  let lastNumber = null
  let currentMatch = []

  sequence.forEach((current, index) => {
    const secondToLastNumber = sequence[currentMatch[currentMatch.length - 2]]

    if (lastNumber !== null) {
      if (isNextFibonacciNumber(lastNumber, current, secondToLastNumber)) {
        lastNumber = current
        currentMatch.push(index)
      } else {
        lastNumber = null
        if (currentMatch.length >= minLength) {
          matches.push([...currentMatch])
        }

        // If was to become 0, 1, 2 continue with 1, 2
        if (
          current === 2
          && currentMatch.length === 2
          && sequence[currentMatch[0]] === 0
          && sequence[currentMatch[1]] === 1
        ) {
          // Only remove leading zero.
          currentMatch.shift()
        } else {
          currentMatch = []
        }
      }
    }

    // This should happen last so a number that might not have been the next
    // in a sequence can still be treated as the first of a new sequence.
    if (lastNumber === null && isFibonacciNumber(current)) {
      lastNumber = current
      currentMatch.push(index)
    }

    // If sequence ends, matches of the correct length should still be added.
    if (
      lastNumber !== null
      && sequence.length === index + 1
      && currentMatch.length >= minLength
    ) {
      matches.push([...currentMatch])
    }
  })

  return matches
}
