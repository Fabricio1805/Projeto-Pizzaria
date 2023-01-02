import prismaClient from '../../prisma/index';


interface ItemRequest {
  id: string
}

class CancelItemService {
  async execute( { id }: ItemRequest) {
    const item = await prismaClient.item.delete({
      where: {
        id
      }
    });

    return item;
  }
}

export default CancelItemService;
