import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

const Dashboard = () => {
  const [table, setTable] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList >>();

  const openOrder = () => {
    if (table === '') {
      return;
    }
    navigation.navigate('Order',{table, order_id: 'dsadasd'});
    
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput
        placeholder='Numero de mesa'
        placeholderTextColor="#1D1D2E"
        style={styles.input}
        keyboardType='numeric'
        value={table}
        onChangeText={setTable}
     />

      <TouchableOpacity
        style={styles.button}
        onPress={openOrder}
      > 
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1D1D2E'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#1D1D2E'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3FFFA3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  },
})










export default Dashboard