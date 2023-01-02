import AppError from '../errors/AppError';
import { NextFunction, Request, Response } from 'express';
import {verify} from 'jsonwebtoken';
import prismaClient from '../../prisma/index';

type JwtPayload = {
  id: string;
}

const Authenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError('Não autorizado', 401);
  }

  const token = authToken.split(' ')[1];

  const { id } = verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

  const user = await prismaClient.user.findFirst({ where: { id } });

  if (!user) {
    throw new AppError('Não autorizado',401);
  }

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};

export default Authenticated;
