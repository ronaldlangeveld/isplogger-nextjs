import { useEffect, useState } from "react";
import Layout from "../../components/authlayout";
import Card from "../../components/dashboard/dashCards";
import api from "../../utils/Api";
import { parseCookies } from "../../utils/parseCookies";
import OnBoardModal from "../../components/dashboard/onBoardModal";
import Head from "next/head";
import Link from 'next/link';
import GoPro from "../../components/gopro";

const Dashboard = ({ networks }) => {
  const [networkList, setNetworkList] = useState(networks || null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if(networkList === null || networkList.length  === 0 ){
      setModal(true);
    }
  }, [networkList])

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <section className="section">
        <div className="container">
     
          <div className="columns is-centered">
            <div className="column is-10">
       
              {networkList !== null && networkList.length > 0 ? (
                <>
                <nav className="level is-mobile">
                  <div className="level-left">
                  <div className="level-item">
                  <h1 className="title is-size-6-mobile">Your Networks</h1>
                  </div>
                  </div>
                  <div className="level-right">
                  <div className="level-item">
                  <Link href="/networks/new"><a className="button is-link is-outlined is-size-7-mobile is-rounded">Add Network</a></Link>
                  </div>
                  </div>

                </nav>

              
                  {networkList.map((item, index) => (
                    <Card key={index} data={item} />
                  ))}
                </>
              ) : (
                <>
                <h1 className="title">You don't have any networks setup</h1>
                <Link href="/networks/new"><a className="button is-primary">Get started</a></Link>

                <OnBoardModal 
                active={modal} 
                setmodal={setModal} />

                 
                </>
              )}
                   <div className="mt-6">
                   <GoPro />
                   </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const cookies = parseCookies(context.req);
  console.log(cookies);
  try {
    const res = await api.get("networks/", {
      headers: { Authorization: `Token ${cookies.ttk}` },
    });
    const networks = res.data;
    return {
      props: {
        networks,
      },
    };
  } catch (err) {
    if (context.res) {
      context.res.writeHead(302, {
        Location: "/login",
      });
      context.res.end();
    }

    return {};
  }
}

export default Dashboard;

// curl -X GET http://127.0.0.1:8000/api/networks/ -H 'Authorization: Token 91def8d8063e3ff3d4fb1c127923c58121289644'
