import express from 'express';
import middlewares from '../middlewares';
import UserController from '../controllers/UserController';

const user = express.Router();
const { updatePassword, updatePersonalInformation, updateProfessionalInformation } = UserController;
const { TokenUtils, UserValidation: { validateUpdatePassword } } = middlewares;

const base = '/user';

user.patch(`${base}/updatepassword`, TokenUtils.verifyToken, validateUpdatePassword(), updatePassword);

user.patch(`${base}/updatepersonalinformation`, TokenUtils.verifyToken, updatePersonalInformation);

user.patch(`${base}/updateprofessionalinformation`, TokenUtils.verifyToken, updateProfessionalInformation);

export default user;
