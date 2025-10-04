import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';

export async function registerUser(email: string, username: string, password: string) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('Użytkownik z tym adresem e-mail już istnieje.');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        },
    });

    const token = jwt.sign(
        { userId: newUser.id, username: newUser.username },
        jwtSecret,
        { expiresIn: '1d' }
    );

    return {
        user: { id: newUser.id, username: newUser.username, email: newUser.email },
        token
    };
}

export async function loginUser(email: string, password: string) {
    throw new Error('Logika logowania niezaimplementowana.');
}