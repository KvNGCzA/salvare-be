import helpers from '../helpers';
import { check } from 'express-validator';
const { formattedError } = helpers;

class UserValidation {
  static validateEmail(req) {
    return check('email')
      .notEmpty()
      .withMessage('please enter an email')
      .isEmail()
      .withMessage('please enter a valid email');
  }

  static validatePassword(req) {
    return check('password')
      .notEmpty()
      .withMessage('please enter a password')
      .isLength({ min: 8 })
      .withMessage('password must be more than 7 characters');
  }

  static validateFullname() {
    return check('fullname')
      .exists()
      .notEmpty()
      .withMessage('please enter a fullname')
      .custom((fullname) => {
        if (/^[a-zA-Z ]*$/.test(fullname)) return true;
        throw new Error('please enter a valid fullname');
      });
  }

  static validateLogin() {
    return [
      UserValidation.validateEmail(req),
      UserValidation.validatePassword(req),
      (req, res, next) => formattedError(req, res, next),
    ];
  }

  static validateSignup() {
    return [
      UserValidation.validateEmail(),
      UserValidation.validateFullname(),
      UserValidation.validatePassword(),
      (req, res, next) => formattedError(req, res, next),
    ];
  }
}

export default UserValidation;
