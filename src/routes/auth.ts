import * as express from 'express';
import type { Request, Response } from 'express';

import { registerUser } from '../services/auth.service.js';
const router = express.default.Router();

interface RegisterBody {
    email: string;
    username: string;
    password: string;
}

router.post('/register', async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane: email, username, password.' });
    }

    try {
        const result = await registerUser(email, username, password);
        res.status(201).json({
            message: 'Rejestracja zakończona sukcesem.',
            user: result.user,
            token: result.token
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Nieznany błąd.';

        if (errorMessage.includes('już istnieje')) {
            return res.status(409).json({ error: errorMessage });
        }

        console.error('Błąd rejestracji:', error);
        res.status(500).json({ error: 'Wystąpił błąd serwera podczas rejestracji.' });
    }
});
router.post('/login', (req: Request, res: Response) => {
    res.send('Endpoint Logowania do zaimplementowania');
});

export default router;