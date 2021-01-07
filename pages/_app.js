import '../styles/globals.scss';
import {AuthContextProvider} from '../context/Auth';
import Navbar from '../components/navbar';


function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
