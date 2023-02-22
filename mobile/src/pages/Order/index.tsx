import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import ModalPicker from '../../components/ModalPicker';

type RouteDetailParams = {
  Order: {
    table: number | string;
    order_id: string;
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export type CategoryProps = {
  id: string;
  name: string;
}

type ProductProps = {
  id: string;
  name: string;
}

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

const Order = () => {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();

  const [amount, setAmount] = useState('1');
  const [items, setItems] = useState<ItemProps[] | []>([]);

  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps | null>();
  const [modalProductVisible, setModalProductVisible] = useState(false);


  useEffect(() => {
    async function loadInfo() {
      await api.get('/categories').then(response => {
        setCategory(response.data);
        setCategorySelected(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });

    }
    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      await api.get('/category/product', {
        params: {
          category_id: categorySelected.id
        }
      }).then((response) => {

        setProducts(response.data);
        setProductSelected(response.data[0]);
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });

    }

    loadProducts();
  },[categorySelected]);

  const handleCloseOrder = async () => {
    try {
      await api.delete('/order', {
        params: {
          order_id: route.params.order_id,
        },
      });

      navigation.goBack();
    } catch(err) {
      console.log('Erro ao cancelar pedido!'+err);
    }
  };


  const handleChangeCategory = (item: CategoryProps) => {
    setCategorySelected(item);
  };

  const handleChangeProduct = (product: ProductProps) => {
    setProductSelected(product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name="trash" size={26} color="#FF3F4b" />
        </TouchableOpacity>
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>

        <TextInput
          style={[styles.input, { width: '60%', textAlign: 'center' }]}
          placeholderTextColor="#1D1D2E"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={[styles.buttonText, { color: '#FFF' }]}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,{opacity: items.length === 0 ? .3 : 1}]}
          disabled={items.length === 0}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginTop: 24}}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D2E',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 14,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    fontSize: 20
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtdText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd: {
    backgroundColor: '#3fd1FF',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  buttonText: {
    color: '#101026',
    fontSize: 22,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Order;
