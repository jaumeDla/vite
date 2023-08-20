import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_ERROR,
    LOGIN_FAILURE,
    LOGIN_ERROR
} from '../config/Constants';

export async function Register(request: Request, response: Response) {
    try {
        const { username, email, password } = request.body;

        const usernameExists = await UserModel.findOne({ username });
        const emailExists = await UserModel.findOne({ email });

        if (!usernameExists && !emailExists) {
            const hashPassword = await bcrypt.hash(password, 10);
            const User = new UserModel({ username, email, password: hashPassword });
            await User.save();
            return response.status(200).send(REGISTER_SUCCESS);
        } else {
            return response.status(400).send(REGISTER_FAILURE)
        }
    } catch (error) {
        return response.status(500).send(REGISTER_ERROR)
    }
}

export async function Login(request: Request, response: Response) {
    try {
        const { email, password } = request.body;

        const userInfo = await UserModel.findOne({ email });

        if (userInfo && (await bcrypt.compare(password, userInfo.password))) {
            const token = jwt.sign({ username: userInfo.username, email }, process.env.JWT_AUTH || '', { expiresIn: '1d' });
            return response.status(200).send(token);
        } else {
            return response.status(400).send(LOGIN_FAILURE);
        }
    } catch (error) {
        return response.status(500).send(LOGIN_ERROR);
    }
}

export async function CheckToken(request: Request, response: Response) {
    try {
        const { token } = request.body;
        const decoded = jwt.verify(token, process.env.JWT_AUTH ?? "");
        return response.status(200).send(decoded);
    } catch {
        return response.status(401).send()
    }
}