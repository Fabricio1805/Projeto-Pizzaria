import prismaClient from '../../prisma/index';

class ListProductService {
  async listProduct() {
    const products = await prismaClient.product.findMany();

    return products;
  }
}

export default ListProductService;
