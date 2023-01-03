import { useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/dashboard'>
          <img src="/logo.svg" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href='/category'>
            Categoria
          </Link>

          <Link href='/prodcut'>
            Produto
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24}/>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
