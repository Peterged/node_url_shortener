import { Request, Response, NextFunction } from 'express';


export const validateUrl = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    next();
}