import express from 'express';
import AuthController from '../controllers/AuthController';
import middlewares from '../middlewares';

const route = express.Router();
const { signup, login, verifyEmail } = AuthController;
const { UserValidation: { validateSignup, validateLogin }, TokenUtils } = middlewares;

const base = '/auth';

route.post(`${base}/signup`, validateSignup(), signup);

route.post(`${base}/login`, validateLogin(), login);

route.get(`${base}/verify`, TokenUtils.verifyToken, verifyEmail);

export default route;
