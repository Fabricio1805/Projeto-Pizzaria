import Head from 'next/head';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { setupAPIClient  } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';
import { FiUpload } from 'react-icons/fi';

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}

const Product = ({categoryList}:CategoryProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState('');

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


  function handleChangeCategory(event) {
    //console.log(categories[event.target.value]);
    setCategorySelected(event.target.value);

  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if ( name === ''
        || description === ''
        || price === ''
        || imageAvatar === null
        || categorySelected === ''
      ) {
        toast.warning('Preencha todos os campos!');
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Produto cadastrado com sucesso!');

      setName('');
      setPrice('');
      setDescription('');
      setImageAvatar(null);
      setAvatarUrl('');
      setCategorySelected('');

    } catch (error) {
      console.log(error);
      toast.error('Erro ao cadastrar produto!');
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
          <form className={styles.form} onSubmit={handleRegister}>

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

            <select value={categorySelected} onChange={handleChangeCategory}>
              <option value="">Selecione a categoria</option>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder='Digite o nome do produto'
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder='Digite o valor do produto'
              className={styles.input}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />

            <textarea
              placeholder='Descreva seu produto...'
              className={styles.input}
              value={description}
              onChange={e => setDescription(e.target.value)}
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
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/categories');

  return {
    props: {categoryList: response.data}
  };
});
