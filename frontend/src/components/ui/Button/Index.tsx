import styles from './styles.module.scss';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?: boolean,
  children: ReactNode,
}
export const Button = ({ loading, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <FaSpinner color="#FFF" size={16} />
      ) : (
        <a className={styles.buttonText}>{children}</a>
      )}
    </button>
  );
};
