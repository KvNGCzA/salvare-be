import express from 'express';
import AuthController from '../controllers/AuthController';
import middlewares from '../middlewares';

const user = express.Router();
const { signup, login, verifyEmail } = AuthController;
const { UserValidation: { validateSignup, validateLogin }, TokenUtils } = middlewares;

const base = '/auth';

user.post(`${base}/signup`, validateSignup(), signup);

user.post(`${base}/login`, validateLogin(), login);

user.get(`${base}/verify`, TokenUtils.verifyToken, verifyEmail);

export default user;
