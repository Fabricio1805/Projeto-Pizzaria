import AppError from '../../shared/errors/AppError';
import prismaClient from '../../prisma';

interface CategoryRequest{
  name: string;
}

class CreateCategoryService{
  async execute({ name }: CategoryRequest){

    if(name === ''){
      throw new AppError('Name invalid');
    }
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        name
      }
    });

    if (categoryExists) {
      throw new AppError('nome de categoria já existe!');
    }

    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      }
    });


    return category;

  }
}

export { CreateCategoryService };
