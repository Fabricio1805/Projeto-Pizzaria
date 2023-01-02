import { Request, Response } from 'express';
import ListProductService from '../../services/product/ListProductService';

class ListProductController{
  async handle(req: Request, res: Response) {
    const listProductService = new ListProductService();

    const products = await listProductService.listProduct();

    return res.json(products);
  }
}


export default ListProductController;
