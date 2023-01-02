import { Request, Response } from 'express';
import FinishOrderService from '../../services/order/FinishOrderService';

class FinishOrderController{
  async execute(req: Request, res: Response) {
    const { id } = req.body;

    const finishOrderService = new FinishOrderService();

    const order = await finishOrderService.execute({ id });

    return res.json(order);
  }
}

export default FinishOrderController;
