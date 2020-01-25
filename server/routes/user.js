import express from 'express';
import middlewares from '../middlewares';
import UserController from '../controllers/UserController';

const route = express.Router();
const { updatePassword, updatePersonalInformation, updateProfessionalInformation } = UserController;
const { TokenUtils, UserValidation: { validateUpdatePassword } } = middlewares;

const base = '/user';

route.patch(`${base}/updatepassword`, TokenUtils.verifyToken, validateUpdatePassword(), updatePassword);

route.patch(`${base}/updatepersonalinformation`, TokenUtils.verifyToken, updatePersonalInformation);

route.patch(`${base}/updateprofessionalinformation`, TokenUtils.verifyToken, updateProfessionalInformation);

export default route;
