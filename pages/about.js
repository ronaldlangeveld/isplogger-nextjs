import { AuthContext } from "../context/Auth";
import { useContext, useEffect } from "react";
import { parseCookies } from "../utils/parseCookies";
import Head from "next/head";
import AboutComp from '../components/about';


const Home = ({ cookies }) => {
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
<title>About ISP Logger</title>
<meta name="title" content="ISP Logger - Internet performance analytics"/>
<meta name="description" content="ISP Logger - Internet performance analytics"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://isplogger.com/"/>
<meta property="og:title" content="ISP Logger - Internet performance analytics"/>
<meta property="og:description" content="Keep track of your internet performance."/>
<meta property="og:image" content="https://isplogger.com/results.png"/>
<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:url" content="https://isplogger.com/"/>
<meta property="twitter:title" content="ISP Logger - Internet performance analytics"/>
<meta property="twitter:description" content="Keep track of your internet performance."/>
<meta property="twitter:image" content="https://isplogger.com/results.png"/>
      </Head>
      <AboutComp />
   
    </>
  );
};


export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context.req);
    return {
      props: {
        cookies,
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
