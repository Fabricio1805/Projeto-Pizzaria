import { Request, Response } from 'express';
import SendOrderService from '../../services/order/SendOrderService';

class SendOrderController{
  public async handle(req: Request, res: Response) {
    const { id } = req.body;

    const sendOrderService = new SendOrderService();

    const orderUpdate = await sendOrderService.execute({
      id
    });

    return res.json(orderUpdate);
  }

}


export default SendOrderController;
