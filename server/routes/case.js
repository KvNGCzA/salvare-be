import express from 'express';
import CaseController from '../controllers/CaseController';
import middlewares from '../middlewares';

const route = express.Router();
const { TokenUtils } = middlewares;
const { createCase, assignCase, dropCase } = CaseController;

const base = '/case';

route.post(`${base}/create`, createCase);

route.post(`${base}/assigncase/:caseId`, TokenUtils.verifyToken, assignCase);

route.post(`${base}/dropcase/:caseId`, TokenUtils.verifyToken, dropCase);

export default route;
