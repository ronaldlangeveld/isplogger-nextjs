import { AuthContext } from "../../context/Auth";
import { useContext, useEffect } from "react";
import { parseCookies } from "../../utils/parseCookies";
import Head from "next/head";
import Footer from '../../components/footer';
import LandNav from "../../components/landNav";
import api from '../../utils/Api';
import Link from 'next/link';
import Flag from 'react-world-flags'

const Home = ({ cookies, provs }) => {

    const flagStyle = {
        height: "50px",
        width: "70px"
    }
  const { state, dispatch } = useContext(AuthContext);

  // console.log(provs);

  // console.log(cookies);

  useEffect(() => {
    if (cookies.ttk) {
      dispatch({ type: "LOGIN", payload: {token: cookies.tkk} });
    }
  }, [cookies]);
 
  return (
    <>
      <Head>
<title>ISP's Tracked on ISP Logger</title>
<meta name="title" content="ISP Logger - Internet speed analytics"/>
<meta name="description" content="ISP Logger - Internet speed analytics"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://isplogger.com/"/>
<meta property="og:title" content="ISP Logger - Internet speed analytics"/>
<meta property="og:description" content="Keep track of your internet speed."/>
<meta property="og:image" content="https://isplogger.com/results.png"/>
<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:url" content="https://isplogger.com/"/>
<meta property="twitter:title" content="ISP Logger - Internet speed analytics"/>
<meta property="twitter:description" content="Keep track of your internet speed."/>
<meta property="twitter:image" content="https://isplogger.com/results.png"/>
      </Head>
      <LandNav />

      <section className="hero is-medium">
  <div className="hero-body">
    <div className="container">
    <h1 className="title">
      ISP's monitored by users speed testing using ISP Logger
    </h1>
    <div className="columns is-centered is-multiline">
            {
                provs.map((item, index) => (
                    <div key={index} className="column is-3">
                        <div className="box">
                            <span>
                                <Flag className="flagSize has-shadow" code={item.country} />
                            </span>
                            <Link href={`/providers/${item.slug}`}><h1 className="title is-6 has-text-centered px-4 py-4 is-clickable"><span className="has-text-link">{item.display_name !== "" ? item.display_name : item.name}</span></h1></Link>
                        </div>
                    </div>
                ))
            }
    </div>
    </div>
  </div>
</section>

    <Footer/>
    </>
  );
};


export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context.req);
    const res = await api.get('providers/');
    const provs = res.data;
    // console.log(provs);
    return {
      props: {
        cookies,
        provs
      },
    };
  } catch (err) {
    // if (context.res) {
    //   context.res.writeHead(302, {
    //     Location: "/",
    //   });
    //   context.res.end();
    // }

    return {};
  }
}

export default Home;
