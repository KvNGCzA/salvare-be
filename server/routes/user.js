import express from 'express';
import middlewares from '../middlewares';
import UserController from '../controllers/UserController';

const user = express.Router();
const { updatePassword } = UserController;
const { TokenUtils, UserValidation: { validateUpdatePassword } } = middlewares;

const base = '/user';

user.patch(`${base}/updatepassword`, TokenUtils.verifyToken, validateUpdatePassword(), updatePassword);

export default user;
