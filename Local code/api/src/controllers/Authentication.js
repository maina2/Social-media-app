import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

export const signup = async (req, res) => {
    const { id, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Use async/await instead of bcrypt.hashSync

    try {
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query(`SELECT * FROM Users WHERE username = @username OR email = @email`);

        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ message: "User already exists" });
        } else {
            await pool.request()
                .input('username', sql.VarChar, username)
                .input('id', sql.VarChar, id)
                .input('email', sql.VarChar, email)
                .input('hashedPassword', sql.VarChar, hashedPassword)
                .query('INSERT INTO Users (id ,username, email, password) VALUES (NEWID(),@username, @email, @hashedPassword)');

            res.status(200).send({ message: 'User created successfully' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    } finally {
        sql.close();
    }
};





export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'no user, Invalid credentials' });
        } else if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed, wrong password' });
            }
        }
        console.log(config.jwt_secret)

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            config.jwt_secret,
            { expiresIn: '1hr' }
        );

        const { id, username } = user;
        res.json({ id: id, username: username, email: email, token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json(error.message);
    } finally {
        sql.close();
    }
};