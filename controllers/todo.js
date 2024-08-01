const fs = require('fs');
const path = require('path');

const TODO_FILE_PATH = path.join(__dirname, '../todos.json');

// Function to load the to-do list from the file
function loadHandler() {
    try {
        const data = fs.readFileSync(TODO_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

// Function to save the to-do list to the file
function saveHandler(todoList) {
    fs.writeFileSync(TODO_FILE_PATH, JSON.stringify(todoList, null, 4));
}

// Fetch all Todos
exports.allTodo = (req, res) => {
    try {
        const data = loadHandler();
        res.status(200).json({
            success: true,
            message: "Successfully fetched data",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching todos"
        });
        console.error(error);
    }
};

// Add a new Todo
exports.addTodo = (req, res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task is required"
            });
        }

        const todo = {
            id: Date.now(),
            task,
            status: 'pending',
            updatedAt: new Date().toISOString()
        };

        let todoList = loadHandler();
        todoList.push(todo);
        saveHandler(todoList);

        res.status(201).json({
            success: true,
            message: "Successfully added todo",
            data: todo
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while adding todo"
        });
        console.error(error);
    }
};

// Delete a Todo
exports.deleteTodo = (req, res) => {
    try {
        const { id } = req.params;
        let todoList = loadHandler();

        const idx = todoList.findIndex(todo => todo.id == id);
        if (idx === -1) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        const deletedTodo = todoList.splice(idx, 1);
        saveHandler(todoList);

        res.status(200).json({
            success: true,
            message: "Successfully deleted todo",
            data: deletedTodo
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting todo"
        });
        console.error(error);
    }
};

// Update a Todo
exports.updateTodo = (req, res) => {
    try {
        const { id } = req.params;
        const { task, status } = req.body;

        let todos = loadHandler();

        const idx = todos.findIndex(todo => todo.id == id);
        if (idx === -1) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        if (task) todos[idx].task = task;
        if (status) todos[idx].status = status;
        todos[idx].updatedAt = new Date().toISOString();

        saveHandler(todos);

        res.status(200).json({
            success: true,
            message: "Successfully updated todo",
            data: todos[idx]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating todo"
        });
        console.error(error);
    }
};

// Mark a Todo as Completed
exports.todoCompleted = (req, res) => {
    try {
        const { id } = req.params;

        let todos = loadHandler();

        const idx = todos.findIndex(todo => todo.id == id);
        if (idx === -1) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        todos[idx].status = 'done';
        todos[idx].updatedAt = new Date().toISOString();

        saveHandler(todos);

        res.status(200).json({
            success: true,
            message: "Successfully marked todo as completed",
            data: todos[idx]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while marking todo as completed"
        });
        console.error(error);
    }
};

// Search and Filter Todos
exports.searchAndFilter = (req, res) => {
    try {
        const { search, status } = req.query;
        let todos = loadHandler();

        console.log(search, status);

        if (search) {
            todos = todos.filter(todo => todo.task.toLowerCase().startsWith(search.toLowerCase()));
        }

        if (status) {
            todos = todos.filter(todo => todo.status === status);
        }

        res.status(200).json({
            success: true,
            message: "Successfully searched and filtered todos",
            data: todos
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while filtering and searching todos"
        });
        console.error(error);
    }
};
