import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { ShortnerController } from '@controllers/shortner';

export function initRouterShortner(controller: ShortnerController): express.Router {
  const router = express.Router();

  router.post('/shorten', (req: Request, res: Response, next: NextFunction) => {
    controller.shorten(req, res, next);
  });

  router.get('/:shortUrl', (req: Request, res: Response, next: NextFunction) => {
    controller.redirect(req, res, next);
  });

  router.get('/info/:shortUrl', (req: Request, res: Response, next: NextFunction) => {
    controller.info(req, res, next);
  });

  router.delete('/delete/:shortUrl', (req: Request, res: Response, next: NextFunction) => {
    controller.delete(req, res, next);
  });

  return router;
}
