To-Do List Backend


Overview
The To-Do List application is a simple project designed to manage and track tasks using a RESTful API built with Node.js and Express. The application allows users to create, read, update, delete, and mark tasks as completed. Data is stored in a JSON file to keep it persistent across application runs.


System Design
Server: The server is built using Node.js with the Express framework. It handles HTTP requests and routes them to appropriate handlers.
Routes: Defined in routes/todo.js, the routes handle various CRUD (Create, Read, Update, Delete) operations related to to-dos.
Data Storage: To-do items are stored in a JSON file (todos.json). The file is read and written to using the filesystem.
Middleware: The application uses Express middleware for parsing JSON request bodies and handling errors.



Implementation

File Structure
app.js: Main application file where the Express app is configured and started.
routes/todo.js: Contains route definitions and handlers for to-do operations.
todos.json: The file where to-do data is stored in JSON format.
Features
Fetch Todos: Retrieve a list of all to-dos.
Add Todo: Add a new to-do item.
Update Todo: Update an existing to-do item.
Delete Todo: Remove a to-do item.
Mark as Done: Mark a to-do item as completed.
Search and Filter: Search and filter to-dos based on criteria.



Setup and Running the Application
Clone the Repository

bash
Copy code

git clone https://github.com/yourusername/todo-list-app.git](https://github.com/Akashpatel9/Todo-Backend.git

Navigate to the Project Directory

bash
Copy code

cd todo-list-app

Install Dependencies


Make sure you have Node.js and npm installed. Run the following command to install the necessary packages:


bash
Copy code

npm install

Create a .env File

Create a .env file in the root of the project and add the following line to set the port number (optional):

makefile
Copy code

PORT=3000


Start the Application

Run the following command to start the server:

bash
Copy code

npm start

By default, the server will run on port 3001. If you set a different port in the .env file, it will use that port.



Access the API

You can access the API endpoints via:

Fetch Todos: GET http://localhost:3001/todo/AllTodo

Add Todo: POST http://localhost:3001/todo/AddTodo

Update Todo: PUT http://localhost:3001/todo/updateTodo/:id

Delete Todo: DELETE http://localhost:3001/todo/deleteTodo/:id

Mark as Done: PATCH http://localhost:3001/todo/completedTodo/:id

Search and Filter: GET http://localhost:3001/todo/filter?search=term&status=pending
