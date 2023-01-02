import { Request, Response } from 'express';
import ListOrderService from '../../services/order/ListOrderService';

class ListOrderController{
  async handle(req: Request, res: Response) {
    const listCategoryService = new ListOrderService();

    const orders = await listCategoryService.listOrder();

    return res.json(orders);
  }
}


export default ListOrderController;
