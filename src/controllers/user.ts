import { Request, Response } from 'express';

import { pool } from '../db';

export class UserController {

    async createUser(req: Request, res: Response): Promise<Response> {
        const { firstname, lastname, email, password } = req.body;

        const query = `
    INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

        const values = [firstname, lastname, email, password];

        try {
            const result = await pool.query(query, values);
            const user = result.rows[0];
            return res.json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating user' });
        }
    }




} 