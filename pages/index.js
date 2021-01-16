import { AuthContext } from "../context/Auth";
import { useContext, useEffect } from "react";
import { parseCookies } from "../utils/parseCookies";
import Head from "next/head";
import Landing from '../components/landing';


const Home = ({ cookies }) => {
  const { state, dispatch } = useContext(AuthContext);

  console.log(cookies);

  useEffect(() => {
    if (cookies.ttk) {
      dispatch({ type: "LOGIN", payload: cookies.tkk });
    }
  }, [cookies]);

  return (
    <>
      <Head>
        <title>ISP Logger</title>
      </Head>
    <Landing auth={state}/>
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
