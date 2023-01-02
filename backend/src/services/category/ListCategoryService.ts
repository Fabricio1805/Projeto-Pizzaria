import prismaClient from '../../prisma/index';

class ListCategoryService {
  async listCategory() {
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      }
    });

    return categories;
  }
}

export default ListCategoryService;
