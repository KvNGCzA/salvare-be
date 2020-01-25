import express from 'express';
import CaseController from '../controllers/CaseController';
import middlewares from '../middlewares';

const route = express.Router();
const { TokenUtils } = middlewares;
const { createCase, assignCase } = CaseController;

const base = '/case';

route.post(`${base}/create`, createCase);

route.patch(`${base}/assigncase/:caseId`, TokenUtils.verifyToken, assignCase);

export default route;
