import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import helpers from '../helpers';
import models from '../../database/models';
import dotenv from 'dotenv';

dotenv.config();

const { responseMessage, createToken } = helpers;
const { User, UserRole } = models;

export default class AuthController {
  static async signup(req, res, next) {
    try {
      const existingUser = await User.findOne({
        where: { email: req.body.email }
      });
      if (existingUser) {
        return responseMessage({
          data: { message: 'a user with this email already exists' },
          status: 409,
          res
        });
      }
      // create user
      const user = await User.create({
        ...req.body,
        email: req.body.email.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 10)
      });
      await UserRole.create({
        userId: user.id,
        roleId: process.env.LAWYER_ID
      })
      // await user.addUserRoles([user.id], process.env.LAWYER_ID)
      delete user.dataValues.password;
      let roles = await user.getUserRoles({
        attributes: ['roleId']
      });
      roles = roles.map(role => role.roleId);
      return responseMessage({
        data: { message: 'done', user, token: createToken(user.id), roles },
        status: 201,
        res
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // find user
      const user = await User.findOne({ where: { email: email.toLowerCase() } });
      // confirm password
      const confirmUser = user ? await bcrypt.compare(password, user.password) : false;
      if (!confirmUser) {
        return responseMessage({
          data: { message: 'email/password do not match' },
          status: 400,
          res
        });
      }
      delete user.dataValues.password;
      let roles = await user.getUserRoles({
        attributes: ['roleId']
      });
      roles = roles.map(role => role.roleId);
      return responseMessage({
        data: {
          message: 'login successful',
          user,
          token: createToken(user.id),
          roles
        },
        status: 200,
        res
      });
    } catch (error) {
      next(error);
    }
  }
}
