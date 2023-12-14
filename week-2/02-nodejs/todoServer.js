/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const shortid = require("shortid");

const app = express();

const todoArray = [
  {
    title: "Todo 1",
    completed: false,
    description: "Buy groceries",
    id: "SKAvtXzrz",
  },
  {
    title: "Todo 2",
    completed: false,
    description: "Finish assignments",
    id: "iZ9RR9Dkt",
  },
  {
    title: "Todo 3",
    completed: false,
    description: "Go outside",
    id: "OH0UoYB65",
  },
];

app.use(bodyParser.json());

/** Retrieve all todo items
 *
 * @route GET '/todos'
 * @param none
 * @route {200} - return all todo items in JSON format
 */
app.get("/todos", (req, res) => {
  res.status(200);
  res.json(todoArray);
});

/** Retrieve a specific todo item by ID
 *
 * @route GET /todos/:id
 * @param {object} id.path.required - id of fetched todo
 * @returns {object} 200 - todo item in JSON format
 * @returns {object} 404 - not found
 */
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const searchItem = todoArray.find((item) => item["id"] == id);
  if (searchItem) {
    res.json(searchItem);
  } else {
    res.status(404);
    res.send("Not found");
  }
});

/** Create a new todo item
 *
 * @route POST /todos
 * @param {object} todo.body.required - object representing the todo item
 * @return {object} 201 - created todo id
 */
app.post("/todos", (req, res) => {
  console.clear();
  const data = req.body;
  data.id = shortid.generate();
  todoArray.push(data);
  res.status(201);
  res.json({ message: "POST request received", data: data });
});

/** Update an existing todo item by ID
 *
 * @route POST /todos/{id}
 * @param {uuid} id.path.required - Used ID
 * @returns {} 200 - success message
 * @returns {} 404 - item not found
 */
app.put("/todos/:id", (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const item = todoArray.find((item) => item.id===id); // returns object or undefined
  if (item) {
    for (const key in data) {
      if (data.hasOwnProperty(key) && item.hasOwnProperty(key)) {
        item[key] = data[key];
      }
    }
    res.status(200);
    res.json(item);
  } else {
    res.status(404);
    res.send("Not found");
  }
});

/** Delete a todo item by ID
 * @route DELETE /todos/:id
 * @param {string} todo.id.required
 * @returns {object} 200 - todo data that was deleted
 * @returns {object} 404 - not found
 */
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todoArray.findIndex((item) => item["id"] === id);
  if (index !== -1) {
    const deletedTodo = todoArray.splice(index, 1);
    res.status(200);
    res.json(deletedTodo);
  } else {
    res.status(404);
    res.send("Not found");
  }
});

app.listen(port, function () {
  console.clear();
  console.log(`Server OK! Running on localhost:${port}`);
});

module.exports = app;

// Validate data before updating - try later
