import { validationResult } from 'express-validator';
import responseMessage from './responseMessage';

export default async (req, res, next, statusCode) => {
  const validationResults = await validationResult(req).array({ onlyFirstError: true });
  if (validationResults.length) {
    const errors = {};
    validationResults.forEach((x) => {
      errors[`${x.param}`] = {};
    });
    validationResults.forEach((err) => {
      errors[`${err.param}`] = err.msg;
    });
    return responseMessage({ data: { errors }, status: statusCode || 422, res });
  }
  return next();
};
