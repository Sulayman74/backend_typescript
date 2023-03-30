import { Router } from 'express';
import { UserController } from './../controllers/user';

const userRouter = Router();
const users = new UserController()

userRouter
    .post("/register", users.createUser)
    .get("/", users.getUsers)
    .get('/:id', users.getUserById)
    .patch('/:id', users.updateUserById)
    .delete('/:id', users.deleteUserById)




// Routes pour les tâches


export default userRouter;
