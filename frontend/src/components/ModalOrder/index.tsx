import styles from './styles.module.scss';
import Modal from 'react-modal';

import { FiX } from 'react-icons/fi';
import { OrderDetailProps } from '../../pages/dashboard/index';


interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderDetailProps[];
  handleFinish: (id: string) => void;

}
const ModalOrder = ({ isOpen, onRequestClose, order ,handleFinish}: ModalOrderProps) => {

  const customStyles = {
    content: {
      top: '50%',
      botton: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1D1D2E',
      borderRadius: '9px'
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
        style={{background: 'transparent', border: 'none'}}
      >
        <FiX size={25} color="#F34748"/>
      </button>

      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>

        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {
          order.map(item => (
            <section key={item.id} className={styles.conteinerItem}>
              <br />
              <span>{item.amount} - <strong className={styles.productName}>{item.product.name}</strong></span>
              <br />
              <span className={styles.description}>{item.product.description}</span>
            </section>
          ))
        }

        <button className={styles.buttonOrder} onClick={() => handleFinish(order[0].order_id)}>
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrder;
