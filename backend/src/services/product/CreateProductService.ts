import prismaClient from '../../prisma/index';

interface IRequest{
  name: string;
  price: number;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService{
  async createProduct({ name, price, description, banner, category_id}: IRequest) {
    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id
      },
    });

    return product;
  }
}

export default CreateProductService;
