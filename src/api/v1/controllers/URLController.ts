import express, { NextFunction } from 'express'
import { Request, Response } from 'express'
const router = express.Router();

const validateURL = (req: Request, res: Response, next: NextFunction) => {}

router.post('/create/:uri', validateURL, (req: Request, res: Response) => {

})



export default router;