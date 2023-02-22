import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation,RouteProp, useRoute } from '@react-navigation/native';


type RouteDetailParams = {
  FinishOrder: {
    table: number | string;
    order_id: string;
  };
};

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>;

const FinishOrder = () => {
  const route = useRoute<FinishOrderRouteProp>();

  console.log(route.params.table);

  const handleFinish = () => {
    alert('clicou');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Deseja finalizar esse pedido?</Text>
      <Text style={styles.title}>Mesa: {route.params?.table}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.textButton}>Finalizar Pedido</Text>
        <Feather name="shopping-cart" size={20} color="#1d1d2e" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alert: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#3FFFA3',
    flexDirection: 'row',
    width: '75%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textButton: {
    fontSize: 18,
    marginRight: 8,
    color: '#1d1d2e',
    fontWeight: 'bold'
  }
});

export default FinishOrder;
