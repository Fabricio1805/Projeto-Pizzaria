import prismaClient from '../../prisma/index';

interface ItemRequest{
  amount: number;
  product_id: string;
  order_id: string;
}


class AddItemService{
  async execute({ amount, product_id, order_id }: ItemRequest) {
    const item = await prismaClient.item.create({
      data: {
        amount,
        product_id,
        order_id
      }
    });

    return item;
  }
}

export default AddItemService;
