import { AuthContext } from "../context/Auth";
import { useContext, useEffect } from "react";
import { parseCookies } from "../utils/parseCookies";
import Head from "next/head";

const Home = ({ cookies }) => {
  const { state, dispatch } = useContext(AuthContext);

  // console.log(cookies);

  useEffect(() => {
    if (cookies.ttk) {
      dispatch({ type: "LOGIN" });
    }
  }, [cookies]);

  return (
    <>
      <Head>
        <title>ISP Logger</title>
      </Head>
      {state.isAuthenticated ? (
        <h1>Logged in</h1>
      ) : (
        <div>
          <h1>Welcome to ISP Logger</h1>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = parseCookies(context.req);
  return {
    props: {
      cookies,
    },
  };
}

export default Home;
