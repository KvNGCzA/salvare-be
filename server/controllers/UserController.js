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

  static async updatePersonalInformation (req, res, next) {
    try {
      const user = await User.findByPk(req.userData.id);
      let message = {};
      const confirmPassword = user && req.body.password ? await bcrypt.compare(req.body.password, user.password) : false;
      if (!confirmPassword) 
        return responseMessage({
          data: { message: 'the password you entered is incorrect'
        }, status: 400, res });
      if (req.body.email && (user.email !== req.body.email.toLowerCase())) {
        // update email
        await user.update({ email: req.body.email.toLowerCase() })
        message.email = 'email successfully updated';
      }
      if (req.body.fullname && (user.fullname !== req.body.fullname.toLowerCase())) {
        // update fullname
        await user.update({ fullname: req.body.fullname.toLowerCase() })
        message.fullname = 'fullname successfully updated';
      }
      if (req.body.phone && (user.phone !== req.body.phone)) {
        // update fullname
        await user.update({ phone: req.body.phone })
        message.phone = 'phone number successfully updated';
      }
      if (Object.keys(message).length === 0) message = 'nothing was updated';
      return responseMessage({ data: { message }, status: 200, res });
    } catch (error) {
      next(error)
    }
  }

  static async updateProfessionalInformation (req, res, next) {
    try {
      const user = await User.findByPk(req.userData.id);
      let message = {};
      const confirmPassword = user && req.body.password ? await bcrypt.compare(req.body.password, user.password) : false;
      if (!confirmPassword) 
        return responseMessage({
          data: { message: 'the password you entered is incorrect'
        }, status: 400, res });
      if (req.body.lawFirm && (user.lawFirm !== req.body.lawFirm.toLowerCase())) {
        // update lawFirm
        await user.update({ lawFirm: req.body.lawFirm.toLowerCase() })
        message.lawFirm = 'law firm successfully updated';
      }
      if (req.body.officeAddress && (user.officeAddress !== req.body.officeAddress.toLowerCase())) {
        // update officeAddress
        await user.update({ officeAddress: req.body.officeAddress.toLowerCase() })
        message.officeAddress = 'office address successfully updated';
      }
      if (req.body.yearsOfExperience && (user.yearsOfExperience !== req.body.yearsOfExperience)) {
        // update yearsOfExperience
        await user.update({ yearsOfExperience: req.body.yearsOfExperience })
        message.yearsOfExperience = 'years of experience successfully updated';
      }
      if (Object.keys(message).length === 0) message = 'nothing was updated';
      return responseMessage({ data: { message }, status: 200, res });
    } catch (error) {
      next(error)
    }
  }
}
