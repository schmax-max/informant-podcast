const {inputValues} = require('./inputValues')

module.exports = {score, calculateScore, getBonus}

async function score (url) {
  const scoreInput = {   
    brevity: 7,
    recency: 3,
    citations: 2,
  }  
  // const {wordsPerMinute} = inputValues
  // const brevityMinutes = 7
  
  // // article.analysis.counts.words / wordsPerMinute  
  // const recencyDays = 3
  // const citationsCount = 2
  return calculateScore (scoreInput)
}

function calculateScore (scoreInput) {  
  let score = 1
  const bonuses = {}
  const factors = {}
  const weighted = {}
  const adjustments = {}

  Object.keys(scoreInput).forEach((key) => {
    const {floors, weights} = inputValues
    bonuses[key] = getBonus(key, scoreInput[key])
    factors[key] = +(bonuses[key] * (1-floors[key]) + floors[key]).toFixed(3)
    weighted[key] = +(Math.pow(factors[key], weights[key])).toFixed(3)
    adjustments[key] = Math.pow(factors[key], weights[key]) / Math.pow(floors[key], weights[key])
    score = +(score*weighted[key]).toFixed(3)
  })

  return {score, calcs: {bonuses, factors, adjustments}}
}


function getBonus (type, value) {
  const {min, max, isInverse} = inputValues[type]
  const range = max - min
  const excess = Math.max(0, value - min)
  let bonus = Math.max(0, excess/range)
  if (isInverse) {
    bonus = 1-bonus
  }
  return +(bonus).toFixed(3)
}

