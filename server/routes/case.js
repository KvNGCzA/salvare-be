import express from 'express';
import CaseController from '../controllers/CaseController';
import middlewares from '../middlewares';

const route = express.Router();
const { TokenUtils } = middlewares;
const { createCase } = CaseController;

const base = '/case';

route.post(`${base}/create`, createCase);

export default route;
