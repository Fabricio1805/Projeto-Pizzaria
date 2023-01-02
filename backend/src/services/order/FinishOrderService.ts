import prismaClient from '../../prisma/index';

interface IOrder {
  id: string;
}

class FinishOrderService{
  async execute({id}: IOrder) {
    const order = await prismaClient.order.update({
      where: {
        id
      },
      data: {
        status: true,
      }
    });

    return order;
  }
}

export default FinishOrderService;
