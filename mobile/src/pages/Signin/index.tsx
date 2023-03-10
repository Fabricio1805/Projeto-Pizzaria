import { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

const SignIn = () => {

  const { signIn, loadingAuth, error } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (email === '' || password === '') {
      return;
    }

    await signIn({ email, password });
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          placeholderTextColor='#101026'
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          placeholderTextColor='#101026'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color="#FFF"/>
        ) : (
          <Text style={styles.buttonText}>Acessar</Text>
        )}

      </TouchableOpacity>

      {
        error && <Text style={styles.error}>{error}</Text>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D2E'
  },
  logo: {
    marginBottom: 18
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14
  },
  input: {
    width: '95%',
    height: 40,
    backgroundColor: '#FFF',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#101026'
  },
  button: {
    width: '85%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026'
  },
  error: {
    width: '95%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF'
  }
});

export default SignIn;
