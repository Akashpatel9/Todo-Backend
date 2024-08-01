const router = require("express").Router();
const { allTodo, deleteTodo, updateTodo, todoCompleted, searchAndFilter, addTodo } = require("../controllers/todo");

router.get('/AllTodo',allTodo)
router.post("/AddTodo",addTodo)
router.delete("/deleteTodo/:id",deleteTodo)
router.patch("/completedTodo/:id",todoCompleted)
router.put("/updateTodo/:id",updateTodo)
router.get("/filture",searchAndFilter)


module.exports = router;