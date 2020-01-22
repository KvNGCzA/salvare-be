import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import helpers from '../helpers';
import models from '../../database/models';
import dotenv from 'dotenv';

dotenv.config();

const { responseMessage, createToken } = helpers;
const { User, UserRole } = models;

export default class UserController {
  static async updatePassword(req, res, next) {
    try {
      const { password, newPassword } = req.body;
      // find user
      const user = await User.findByPk(req.userData.id);
      // confirm password
      const confirmPassword = user ? await bcrypt.compare(password, user.password) : false;
      const clashingPassword = user ? await bcrypt.compare(newPassword, user.password) : false;
      if (clashingPassword) {
        return responseMessage({
          data: { message: 'you are already using the same password' },
          status: 400,
          res
        });
      }
      if (!confirmPassword) {
        return responseMessage({
          data: { message: 'old password is incorrect' },
          status: 400,
          res
        });
      }
      // update password
      await user.update({ password: bcrypt.hashSync(req.body.newPassword, 10) });
      return responseMessage({
        data: { message: 'password updated successfully' },
        status: 200,
        res
      });
    } catch (error) {
      next(error)
    }
  }
}
