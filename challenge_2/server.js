const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoModel = require('./mongo.js').filesModel
console.log(mongoModel)

const app = express();
app.use(express.static('client'));
app.use(bodyParser.json());

app.post('/json', (req, res) => {
  let json = req.body;
  let csvString = generateCSV(json)
  var mongoObj = {
    jsonFile: JSON.stringify(req.body),
    csvFile: csvString
  }
  var myData = new mongoModel(mongoObj)
  myData.save()
  .then(mongoData => {
    console.log('mongoData inserted, it is', mongoData)
    res.send(csvString)
  })
  .catch(error => {
    res.status(400).send('error is', error)
  })
  // res.send(generateCSV(json));

});

var addRowId = function(newLine, rowCount) {
  newLine[0] = rowCount;
};
var addRowParentId = function(newLine, parentId) {
  newLine[1] = parentId;
};

var generateCSV = function(initialJSON) {
  let rowCount = 0;
  let rowId = 0;
  let firstString = '';
  let bodyString = '';
  let firstLine = ['rowId', 'parentId'];

  var recurse = function(jsonObj, parentId) {
    let newLine = [null, null];
    for (let field in jsonObj) {
      if (bodyString === '' && field !== 'children') {
        firstLine.push(field);
      }
      if (field !== 'children') {
        newLine.push(jsonObj[field]);
      }
    }
    addRowId(newLine, rowCount);
    addRowParentId(newLine, parentId);
    let savedId = rowCount;
    rowCount++;

    bodyString = bodyString.concat(newLine.join(',') + '<br>');
    if (jsonObj.children) {
      for (let child of jsonObj.children) {
        recurse(child, savedId);
      }
    }
  };

  recurse(initialJSON, 0);
  firstString = firstLine.join(',') + '<br>';
  return firstString.concat(bodyString);
};

app.listen(3000, () => console.log('Example app listening on port 3000!'));
