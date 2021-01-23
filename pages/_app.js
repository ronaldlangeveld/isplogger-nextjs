import '../styles/globals.scss';
import {AuthContextProvider} from '../context/Auth';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.css';
// import 'nprogress/nprogress.css'; //styles of nprogress


Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
