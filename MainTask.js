/* imports */
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var fs = require('fs');

nightmare
  /* connect to the webpage */
  .goto('http://google.com')
  .type('form[action*="/search"] [name=q]', 'datatables')
  .click('form[action*="/search"] [type=submit]')
  .wait(1000)
  .click('div.rc h3.r a')

  /* Use drop down filter to view all entries as opposed to just top 10 */
  // this is unfortunately not working yet
  // .wait(1000)
  // .click("div.dataTables_length label select option[value='100']")
  // .wait(5000)

  /* Extract info from the webpage */
  .evaluate(function() {

    /* initiate array which will hold all table entries */
    var TableEntries = [];

    /* retrieve the table using "id=example" and store rows */
    var table = document.getElementById("example");
    var rows = table.rows;
    var rowCount = rows.length;

    /* Iterate through each row -- skips first and last rows because they are just the column titles */
    for(i = 1; i < rowCount-1; i++){
      /* each iteration of this loop will create an oject to represent 1 row of the table */

      /* initiate empty object to store current row info */
      var rowObj = {};

      /* for each row, get corresponding cells from all columns */
      var cells = rows[i].cells;
      var cellCount = cells.length;

      /* Iterate through each cell/column of each row */
      for (j = 0; j < cellCount; j++){
        /* each iteration of this loop will add a cell's content to rowObj */

        /*
        rows[0] = all column titles
        row[0].cells[0] = "Name"
        row[0].cells[1] = "Position"
        ...etc...

        i.e. for i = 0 & j = 3
        rowObj[rows[0].cells[3].textContent] = cells[3].textContent
        rowObj["Age"] = 33
        this creates the object {Age: "33"}
        */
        rowObj[rows[0].cells[j].textContent] = cells[j].textContent;

      }

      /* After going through every cell the rowObj should look something like this:
       { Age: '22',
         Name: 'Cedric Kelly',
         Office: 'Edinburgh',
         Position: 'Senior Javascript Developer',
         Salary: '$433,060',
         Start date: '2012/03/29' }
      */

      // Add the current rowObj to the array
      TableEntries.push(rowObj);
    }

    // all rows have been added to the array as objects, return the whole array
    return TableEntries;

  })
  .end()

  /* Display and export information gathered from webpage */
  .then(function(result) {

    /* Print out all the object array */
    console.log(result);

    /* Export the array as a CSV file */
    var csv = '';

    /* Iterate through each object of the array */
    for (i=0; i<result.length; i++){
      var line = '';

      /* Iterate through each property of the object (i.e. Age, Name, Office...etc) */
      for (cell in result[i]){
        if (result[i].hasOwnProperty(cell)) {

          /* Create csv entry for each property */
          line += '\"' + result[i][cell] + '\"' + ',';
        }
      }

      /* After going through every property the line variable should look something like this :
       "47","Angelica Ramos","London","Chief Executive Officer (CEO)","$1,200,000","2009/10/09",
       */

      // Add newline character and add the line to the rest of the csv string
      line += ('\n');
      csv += line;
    }

    /* csv string now represents the entire table and is written to a file here */
    fs.writeFile("DataTablesInfo.csv", csv, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('CSV file created!!\n');
    });

  })
  .catch(function(error) {
    console.error('Search failed:', error);
  })
