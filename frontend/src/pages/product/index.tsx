import Head from 'next/head';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { setupAPIClient  } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiUpload } from 'react-icons/fi';

const Product = () => {

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];
    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <Head>
        <title>Novo produto - sujeito pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.form} >

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload color="#FFF" size={30}/>
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select>
              <option>Bebida</option>
            </select>

            <input
              type="text"
              placeholder='Digite o nome do produto'
              className={styles.input}
            />

            <input
              type="number"
              placeholder='Digite o valor do produto'
              className={styles.input}
            />

            <textarea
              placeholder='Descreva seu produto...'
              className={styles.input}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
};
export default Product;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});
