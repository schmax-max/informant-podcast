'use strict'


const inputValues = {
  floors: {
    brevity: 0.2,
    recency: 0.2,
    citations: 0.2,
  },
  weights: {
    brevity: 1,
    recency: 1,
    citations: 1,
  },
  brevity: {
    min: 5, // minutes
    max: 20, // minutes
    isInverse: true,
  },
  recency: {
    min: 0, // days
    max: 7, // days
    isInverse: true
  },
  citations: {
    min: 0, // citations
    max: 5, // citations
    isInverse: false
  },
  wordsPerMinute: 200,
}

module.exports = {inputValues}

