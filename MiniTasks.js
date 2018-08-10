const fetch = require('node-fetch');
const cheerio = require('cheerio');

const googleUrl = 'https://google.com';

function doTheThing(){
  return fetch(`${googleUrl}`).then(response => response.text());
}

doTheThing()
  .then(
    body => {
      const $ = cheerio.load(body);
      $('.ds').each(function(i, element) {
        const $element = $(element);

        const $text = $element.find('input');

        // question #2 - return the value of "title"
        console.log($text.attr('title'));

      })
    }
);
