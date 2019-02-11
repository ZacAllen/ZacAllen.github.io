const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getRhymes = async word => {
  const url = `http://www.b-rhymes.com/rhyme/word/${word}`
  const html = await fetch(url).then(res => res.text())
  const $ = cheerio.load(html)
  const words = $('.rhyme-table .word')
    .map((i, el) =>
      $(el)
        .text()
        .trim()
    )
    .get() // convert to vanilla array
  return words
}

module.exports = getRhymes
