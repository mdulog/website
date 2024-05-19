const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/data', async (req, res) => {
  // Read the CSV file
  const csvPath = path.join(__dirname, 'data.csv');
  const csvData = fs.readFileSync(csvPath, 'utf8');
  
  // Parse the CSV data into JSON
  const jsonData = parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });
  
  res.json(jsonData);
});

app.put('/data', (req, res) => {

  // Read the CSV file
  const csvPath = path.join(__dirname, 'data.csv');
  const csvData = fs.readFileSync(csvPath, 'utf8');

  // Parse the CSV data into JSON
  const jsonData = parse(csvData, {
      columns: true,
      skip_empty_lines: true
  });

  jsonData.push(req.body);

  // Convert the JSON data back to CSV
  const csvOutput = stringify(jsonData, {
    header: true,
    columns: Object.keys(jsonData[0])
  });

  // Write the CSV data to a new file
  fs.writeFileSync(path.join(__dirname, 'data.csv'), csvOutput);

  res.sendStatus(201);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});