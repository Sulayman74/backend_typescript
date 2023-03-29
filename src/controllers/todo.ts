import { Request, Response } from "express";

import { pool } from "../db"

export class TodoController {

    async createTodo(req: Request, res: Response): Promise<Response> {
        const { description, texte, iscompleted, user_id } = req.body;

        const query = `
        INSERT INTO todos (description, texte, iscompleted, createdat,user_id)
        VALUES ($1, $2, $3, NOW(),$4)
        RETURNING *
        `;

        const values = [description, texte, iscompleted, user_id];

        try {
            const result = await pool.query(query, values);
            const todo = result.rows[0];
            return res.status(200).json(todo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating todo' });
        }
    }

    async getTodos(req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM todos');
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }

    async getTodoById(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
            if (result.rowCount > 0) {
                res.json(result.rows[0]);
            } else {
                res.status(404).send('Todo not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }

    async updateTodoById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { description, text } = req.body;

        try {
            const result = await pool.query(
                'UPDATE todos SET description = $1, text = $2, updated_at = now() WHERE id = $3 RETURNING *',
                [description, text, id]
            );
            if (result.rowCount > 0) {
                res.json(result.rows[0]);
            } else {
                res.status(404).send('Todo not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }


    async deleteTodoById(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
            if (result.rowCount > 0) {
                res.json(result.rows[0]);
            } else {
                res.status(404).send('Todo not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}


