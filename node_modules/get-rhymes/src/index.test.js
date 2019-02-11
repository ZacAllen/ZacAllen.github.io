/* global expect, it, beforeAll */

const getRhymes = require('./index')
const isString = require('lodash.isstring')
const sortBy = require('lodash.sortby')

let rhymes

beforeAll(async () => {
  rhymes = await getRhymes('simple')
})

it('returns an array', () => {
  expect.assertions(1)
  expect(Array.isArray(rhymes)).toBe(true)
})

it('returns an array of strings', () => {
  expect.assertions(rhymes.length)
  rhymes.forEach(rhyme => {
    expect(isString(rhyme)).toBe(true)
  })
})

it('returns an array of strings sorted by length', () => {
  expect.assertions(rhymes.length)
  const sortedRhymes = sortBy(rhymes, ['length'])
  sortedRhymes.forEach((sortedRhyme, i) => {
    const actualRhyme = rhymes[i]
    expect(sortedRhyme.length).toEqual(actualRhyme.length)
  })
})

it('returns an empty array when asked to get rhymes for an empty string', async () => {
  rhymes = await getRhymes('')
  expect(rhymes.length).toBe(0)
})

it('throws an error when passed something besides a string', async () => {
  await expect(getRhymes(null)).rejects.toThrowErrorMatchingSnapshot()
})
