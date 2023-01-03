import type { AppProps } from 'next/app';
import '../../styles/Global.scss';
import { AuthProvider } from '../contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={700}
        position='bottom-center'
        theme='dark'
        draggable
      />
    </AuthProvider>
  );
}
