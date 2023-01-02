import AppError from '../../shared/errors/AppError';
import { Request, Response } from 'express';
import CreateProductService from '../../services/product/CreateProductService';

class CreateProductController{
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new AppError('error upload file');
    }
    const { filename } = req.file;

    const product = await createProductService.createProduct({
      name,
      price,
      description,
      banner: filename,
      category_id
    });

    return res.status(201).json(product);
  }
}

export default CreateProductController;
