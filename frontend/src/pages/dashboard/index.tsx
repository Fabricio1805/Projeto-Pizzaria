import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupAPIClient } from '../../services/api';

import Modal from 'react-modal';
import ModalOrder from '../../components/ModalOrder';

type orderProps = {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name?: string;
}


export type OrderDetailProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    banner: string;
    description: string;
    category_id: string;
  }
  order: {
    id: string;
    table: number;
    name?: string;
    status: boolean;
  }
}
interface OrdersProps {
  ordersList: orderProps[];
}
const Dashboard = ({ ordersList }: OrdersProps) => {

  const [orders, setOrders] = useState(ordersList || []);

  const [modalItem, setModalItem] = useState<OrderDetailProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id,
      }
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  async function handleFinishItem(id: string) {
    const apiClient = setupAPIClient();

    await apiClient.put('/order/finish', {
      id
    });

    const response = await apiClient.get('/orders');

    setOrders(response.data);
    setModalVisible(false);
  }

  async function handleRefreshOrders() {

    const apiClient = setupAPIClient();
    const response = await apiClient.get('/orders');
    setOrders(response.data);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Painel - sujeito pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color='#3FFFa3'/>
            </button>
          </div>

          <article className={styles.listOrders}>
            {ordersList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado...
              </span>
            )}
            {orders.map(order => (
              <section className={styles.orderItem} key={order.id}>
                <button onClick={() => handleOpenModalView(order.id)}>
                  <div className={styles.tag} ></div>
                  <span>
                    Mesa: {order.table}
                    {order.name && <span> - ( {order.name} )</span>}
                  </span>
                </button>
              </section>
            ))}
          </article>

        </main>
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinish={handleFinishItem}
          />
        )}
      </div>
    </>
  );
};
export default Dashboard;


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');

  return {
    props: {ordersList: response.data}
  };
});
