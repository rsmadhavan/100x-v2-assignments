/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
// use require('fs') to promise to promisify the library
const path = require('path');
const { error } = require('console');
const app = express();

app.use(bodyParser.json());

/** Returns a list of files present in './files/' dir
 * 
 * @route GET /files
 * @return {object} 200 - aray of file name in JSON format
 * 
 */
app.get('/files',async(req,res)=>{
  const filePath = path.join(__dirname,'/files/');
  fs.readdir(filePath,(err,files)=>{
    if (err) return res.status(500).json({error:'Internal server error'});
    return res.json(files);
  })
})


/** Return content of given file by name
 * 
 * @route /file/:filename
 * @param {string} req.query.filename.required
 * @return {object} 200 - file content 
 * @return {string} 404 - Not found
 * 
 */   
app.get('/file/:filename',(req,res)=>{
  const filePath = path.join(__dirname,'/files/',req.params.filename);
  fs.readFile(filePath,(err,file)=>{
    if (err) return res.status(404).send('File not found');
    return res.send(file);
  })
})

/** Return invalid routes */

app.use((req,res,next)=>{
  res.status(404).send('Route not found');
});

// app.listen(3000,function(){
//   console.log('Server started! Running on localhost:3000');
// })
module.exports = app;