import { Request, Response } from 'express';
import AddItemService from '../../services/order/AddItemService';

class AddItemController{
  async handle(req: Request, res: Response) {
    const { amount, product_id, order_id } = req.body;

    const addItemService = new AddItemService();

    const item = await addItemService.execute({
      amount,
      product_id,
      order_id,
    });

    return res.status(201).json(item);
  }
}

export default AddItemController;
