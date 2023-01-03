import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { setupAPIClient  } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

const Category = () => {
  const [name, setName] = useState('');

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (name === '') {
      toast.warning('Preencha todos os campos!');
      return;
    }

    const apiClient = setupAPIClient();

    await apiClient.post('/category', {
      name
    }).then(() => {

      toast.success('categoria cadastrada com sucesso!');
      setName('');

    }).catch(() => {

      toast.error('erro ao cadastrar categoria!');
    });
  };

  return (
    <>
      <Head>
        <title>Nova Categria - sujeito pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder='Digite o nome da categoria'
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <button
              className={styles.buttonAdd}
              type='submit'
            >Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
};
export default Category;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});
