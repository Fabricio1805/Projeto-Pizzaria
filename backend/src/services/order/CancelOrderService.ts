import prismaClient from '../../prisma/index';


interface OrderRequest {
  id: string
}

class CancelOrderService{
  async execute( { id }: OrderRequest) {
    const order = await prismaClient.order.delete({
      where: {
        id
      }
    });

    return order;
  }
}

export default CancelOrderService;
