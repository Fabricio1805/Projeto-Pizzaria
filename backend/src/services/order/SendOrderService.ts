import prismaClient from '../../prisma/index';

interface IOrder {
  id: string;
}

class SendOrderService{
  public async execute({ id }: IOrder) {
    const order = await prismaClient.order.update({
      where: {
        id
      },
      data: {
        draft: false,
      }
    });

    return order;
  }
}

export default SendOrderService;
