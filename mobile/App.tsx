import { View,StatusBar } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="1d1d2e" barStyle="light-content" translucent={false} />
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}

