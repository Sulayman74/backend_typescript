import { Router } from 'express';
import { TodoController } from './../controllers/todo';

const todoRouter = Router();
const todos = new TodoController()

todoRouter
    .post("/addTodo", todos.createTodo)
    .get("/", todos.getTodos)
    .get('/:id', todos.getTodoById)
    .put('/:id', todos.updateTodoById)
    .delete('/:id', todos.deleteTodoById)




// Routes pour les tâches


export default todoRouter;



