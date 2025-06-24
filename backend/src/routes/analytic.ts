import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AnalyticController } from '@controllers/analytic';

export function initRouterAnalytic(controller: AnalyticController): express.Router {
  const router = express.Router();

  router.get('/analytics/:shortUrl', (req: Request, res: Response, next: NextFunction) => {
    controller.analytic(req, res, next);
  });

  return router;
}
