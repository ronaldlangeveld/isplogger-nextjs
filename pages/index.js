import { AuthContext } from "../context/Auth";
import { useContext, useEffect } from "react";
import { parseCookies } from "../utils/parseCookies";
import Head from "next/head";
import Landing from '../components/landing';
import Footer from '../components/footer';
import api from '../utils/Api';

const Home = ({ cookies, stats }) => {
  const { state, dispatch } = useContext(AuthContext);

  console.log(cookies);

  useEffect(() => {
    if (cookies.ttk) {
      dispatch({ type: "LOGIN", payload: {token: cookies.tkk} });
    }
  }, [cookies]);
 
  return (
    <>
      <Head>
<title>ISP Logger - Internet speed analytics</title>
<meta name="title" content="ISP Logger - Internet speed analytics"/>
<meta name="description" content="ISP Logger - Internet speed analytics"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://isplogger.com/"/>
<meta property="og:title" content="ISP Logger - Internet speed analytics"/>
<meta property="og:description" content="Keep track of your internet speed."/>
<meta property="og:image" content="https://isplogger.com/sns_card.png"/>
<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:url" content="https://isplogger.com/"/>
<meta property="twitter:title" content="ISP Logger - Internet speed analytics"/>
<meta property="twitter:description" content="Keep track of your internet speed."/>
<meta property="twitter:image" content="https://isplogger.com/sns_card.png"/>
      </Head>
    <Landing statistics={stats} auth={state} />
    <Footer/>
    </>
  );
};


export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context.req);
    const res = await api.get('open-stats/');
    // const provs = await api.get('providers/');
    // const providers = provs.data;
    // console.log(providers)
    const stats = res.data;
    return {
      props: {
        cookies,
        stats,
        // providers
      },
    };
  } catch (err) {
    if (context.res) {
      context.res.writeHead(302, {
        Location: "/",
      });
      context.res.end();
    }

    return {};
  }
}

export default Home;
