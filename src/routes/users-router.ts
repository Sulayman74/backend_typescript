import { Router } from 'express';
import { UserController } from './../controllers/user';

const userRouter = Router();
const users = new UserController()

userRouter
    .post("/register", users.createUser)
// .get("/", users.)
// .get('/:id', users.)
// .put('/:id', users.)
// .delete('/:id', users.)




// Routes pour les tâches


export default userRouter;
