import { Request, Response } from 'express';

import { User } from './../../models/user';
import { pool } from '../db';
import validator from 'validator';

export class UserController {

    async createUser(req: Request, res: Response): Promise<Response> {
        const { firstname, lastname, email, password } = req.body;
        // Vérifie si l'e-mail est valide en utilisant la fonction isEmail de Validator
        console.log("email:", email);
        if (!validator.isEmail(email)) {
            res.status(400).json({ message: "L'adresse e-mail est invalide" });
        }
        try {
            // Recherche l'utilisateur dans la base de données
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user: User = result.rows[0];

            // Vérifie si l'utilisateur existe déjà
            if (user) {
                res.status(403).json({ message: "Cet utilisateur existe déjà" });
            }

            // Crée un nouvel utilisateur dans la base de données
            const register = `
      INSERT INTO users (firstname, lastname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
            const values = [firstname, lastname, email, password];
            const newUserResult = await pool.query(register, values);
            const newUser = newUserResult.rows[0];

            res.status(201).json({ "user": newUser, "message": "utilisateur bien enregistré" });
        } catch (error) {
            // console.error(error);
            return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: error.detail });
        }
    }


    async getUsers(req: Request, res: Response): Promise<Response> {

        try {
            const result = await pool.query('SELECT * FROM users')
            res.status(200).json(result.rows);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
            if (result.rowCount > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
    }

    async updateUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const { firstname, lastname, email } = req.body;

        try {

            const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])

            const result = await pool.query(
                'UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE user_id = $4 RETURNING *',
                [firstname, lastname, email, id]
            );
            if (!user) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
    }


    async deleteUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        try {
            const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
            if (result.rowCount > 0) {
                res.status(200)

            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
    }


}


