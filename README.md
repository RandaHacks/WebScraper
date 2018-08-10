# WebScraper
A Javascript and Nightmare.js web-scraper which fetches information from a designated webpage and exports to CSV file.

## To run

1. Open terminal
2. cd to directory of .js file
3. npm install nightmare --save
4. npm install cheerio --save
5. npm install node-fetch --save
6. node MainTask.js

## Improvements to be made

When the WebScraper reaches the webpage https://datatables.net/, it is only able to extract the first 10 results in the table.

Improvement: Use nightmare to click on the drop down which allows 100 search results to be seen in the table. This way, the data extraction is as efficient as possible.

An attempt at this was started in the MainTask.js file, and is commented out for future reference.

## Example

A sample of the exported CSV file is named DataTablesInfo.csv
