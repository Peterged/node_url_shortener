import { Request, Response, NextFunction } from 'express';

const validateUrl = (req: Request, res: Response, next: NextFunction) => {
  // Debug
  console.log(req.params);
  next();
};

export default validateUrl;
