import express from 'express';
import AuthController from '../controllers/AuthController';
import middlewares from '../middlewares';

const user = express.Router();
const { signup, login } = AuthController;
const { UserValidation: { validateSignup, validateLogin } } = middlewares;

const base = '/auth';

user.post(`${base}/signup`, validateSignup(), signup);

user.post(`${base}/login`, validateLogin(), login);

export default user;
