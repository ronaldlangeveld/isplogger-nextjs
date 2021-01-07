import { useState } from "react";
import Layout from "../../components/authlayout";
import Card from "../../components/dashboard/dashCards";
import api from "../../utils/Api";
import { parseCookies } from "../../utils/parseCookies";

const Dashboard = ({ networks }) => {
  const [networkList, setNetworkList] = useState(networks || null);

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6">
           
              {networkList !== null && networkList.length > 0 ? 
              
              (
                <>
                   <h1 className="title">Your Networks</h1>
                {
                networkList.map((item, index) => (
                  <Card key={index} data={item} />
                ))
                }
                </>
              )
              : (
                <>
             
                  <div className="content has-text-centered">
                    <p><strong>Hi, Welcome to ISP Logger</strong></p>
                    <p>To get started, let's create a network.</p>
                    <div className="box">
                  
                    </div>
                    <p>Don't worry, you can add more later on.</p>
                  </div>

                </>
              )}
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
