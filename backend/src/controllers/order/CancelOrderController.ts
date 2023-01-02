import { Request, Response } from 'express';
import CancelOrderService  from '../../services/order/CancelOrderService';

class CancelOrderController{
  async handle(req: Request, res: Response) {
    const id = req.query.id as string;

    const cancelOrderService = new CancelOrderService();

    await cancelOrderService.execute({ id });

    return res.json([]);
  }
}

export default CancelOrderController;
