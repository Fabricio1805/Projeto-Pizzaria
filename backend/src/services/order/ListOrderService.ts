import prismaClient from '../../prisma/index';

class ListOrderService {
  async listOrder() {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_at: 'desc'
      },
    });

    return orders;
  }
}

export default ListOrderService;
