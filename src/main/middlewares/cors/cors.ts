import { Request, Response, NextFunction } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.set('access-controll-allow-origins', '*')
  res.set('access-controll-allow-headers', '*')
  res.set('access-controll-allow-methods', '*')
  next()
}
