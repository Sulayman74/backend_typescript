import { Router } from 'express';
import { TodoController } from './../controllers/todo';

const todoRouter = Router();
const todos = new TodoController()

todoRouter
    .get("/", todos.getTodos)
    .post("/addTodo/:id", todos.createTodo)
    .get('/:id', todos.getTodoById)
    .patch('/:id', todos.updateTodoById)
    .delete('/:id', todos.deleteTodoById)




// Routes pour les tâches


export default todoRouter;



