import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {api} from '../../services/api';

type RouteDetailParams = {
  Order: {
    table: number | string;
    order_id: string;
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

const Order = () => {
  const route = useRoute<OrderRouteProps>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table}</Text>
        <TouchableOpacity>
          <Feather name="trash" size={26} color="#FF3F4b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text>Pizzas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text>Pizza de calumbresa</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>

        <TextInput
          style={[styles.input, { width: '60%', textAlign: 'center' }]}
          placeholder="1"
          placeholderTextColor="#1D1D2E"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={[styles.buttonText,{color: '#FFF'}]}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
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
