import bcrypt from 'bcrypt';
import helpers from '../helpers';
import models from '../../database/models';
import dotenv from 'dotenv';

dotenv.config();

const { responseMessage, createToken, sendMail } = helpers;
const { Case } = models;

export default class CaseController {
  static async createCase (req, res, next) {
    try {
      const { shortDescription, longDescription, state, reporterName, email, phone } = req.body;
      const caseDetails = await Case.create({
        shortDescription, longDescription, state, reporterName, email, phone
      });
      const mail = {
        from: 'Salvare Case Created<no-reply@salvare.com>',
        to: email,
        subject: 'Case Successfully created',
        html:
        `<div style="height: 100px; border: 1px solid blue;">
          <a href="${process.env.FRONTEND_BASE_URL}/case/${caseDetails.id}" target="_blank">view case</a>
        </div>
        `
      };
      // send email
      sendMail.send(mail, (err, body) => { console.log(err) })
      responseMessage({ data: { message: 'case successfully created', caseDetails }, status: 201, res})
    } catch (error) {
      next(error);
    }
  }
}