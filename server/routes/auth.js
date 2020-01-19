import express from 'express';
import AuthController from '../controllers/AuthController';
import middlewares from '../middlewares';

const user = express.Router();
const { signup } = AuthController;
const { UserValidation: { validateSignup } } = middlewares;

const base = '/auth';

user.post(`${base}/signup`, validateSignup(), signup);

// user.post(`${base}/login`, login);

export default user;
