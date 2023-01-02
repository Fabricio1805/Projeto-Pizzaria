import { Request, Response } from 'express';
import CancelItemService  from '../../services/order/CanceItemService';

class CancelItemController{
  async handle(req: Request, res: Response) {
    const id = req.query.id as string;

    const cancelItemService = new CancelItemService();

    await cancelItemService.execute({ id });

    return res.json([]);
  }
}

export default CancelItemController;
