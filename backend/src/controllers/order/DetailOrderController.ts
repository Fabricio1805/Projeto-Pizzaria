import { Request, Response } from 'express';
import DetailOrderService from '../../services/order/DetailOrderService';

class DetailOrderController{
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const detailService = new DetailOrderService();

    const details = await detailService.execute({order_id});

    return res.json(details);
  }
}

export default DetailOrderController;
