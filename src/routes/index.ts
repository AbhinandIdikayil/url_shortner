import { Router } from "express";
import { authAndUrlRoute } from "./authAndUrlRoute";
import { analyticsRouter } from "./analyticsRoute";


const allRoute = Router();

allRoute.use('/', authAndUrlRoute);      
allRoute.use('/analytics', analyticsRouter); 

export { allRoute };