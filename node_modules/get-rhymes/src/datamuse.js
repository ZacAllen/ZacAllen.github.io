const fetch = require('node-fetch')

const RHYME = {
  perfect: 'rhy', // 'rhy' is the code the Datamuse API uses for perfect rhymes
  near: 'nry'
}

const getRhymes = async word => {
  const perfectRhymes = await getRhymesOfType(word, RHYME.perfect)
  const nearRhymes = await getRhymesOfType(word, RHYME.near)
  return [...perfectRhymes, ...nearRhymes]
}

const getRhymesOfType = async (word, rhymeType) => {
  const url = getDatamuseUrl(word, rhymeType)
  const results = await fetch(url).then(res => res.json())
  const words = results.map(result => result.word)
  return words
}

const getDatamuseUrl = (word, rhymeType) => {
  word = global.encodeURIComponent(word)
  return `https://api.datamuse.com/words?rel_${rhymeType}=${word}`
}

module.exports = getRhymes
