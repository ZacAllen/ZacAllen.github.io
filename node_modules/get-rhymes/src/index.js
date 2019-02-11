const getDatamuseRhymes = require('./datamuse')
const getBRhymes = require('./b-rhymes')
const uniq = require('lodash.uniq')
const sortBy = require('lodash.sortby')

const isBlank = word => word.trim().length === 0

const getRhymes = async word => {
  if (word == null) throw new Error(`Word can't be null or undefined.`)
  if (isBlank(word)) return []

  // Get rhymes from both sources in parallel.
  const promises = [getDatamuseRhymes(word), getBRhymes(word)]
  const [dataMuseRhymes, bRhymes] = await Promise.all(promises)
  const rhymes = uniq([...dataMuseRhymes, ...bRhymes])
  return sortBy(rhymes, ['length'])
}

module.exports = getRhymes
