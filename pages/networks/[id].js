import { useRouter } from "next/router";
import api from "../../utils/Api";
import { parseCookies } from "../../utils/parseCookies";
import Layout from "../../components/authlayout";
import { useEffect, useState } from "react";
import LatestCard from "../../components/network/latestCard";
import Head from "next/head";
import cookie from "js-cookie";

const Network = ({ networks, cookies }) => {
  const [networkInfo, setNetworkInfo] = useState(networks || null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  //DUMMY NUMBERS, FIX IT
  //   const SPEEDS = {
  //     Bps: 1,
  //     Kbps: 1000,
  //     Mbps: 1000000,
  //     Gbps: 1000000000,
  //   };

  const speedunits = [
    {
      key: 0,
      unit: "Bps",
      conversion: 1,
    },
    {
      key: 1,
      unit: "Kbps",
      conversion: 1000,
    },
    {
      key: 2,
      unit: "Mbps",
      conversion: 1000000,
    },
    {
      key: 3,
      unit: "Gbps",
      conversion: 1000000000,
    },
  ];
  const [speeds, setSpeeds] = useState(speedunits);

  const [units, setUnits] = useState({
    key: 2,
    unit: "Mbps",
    conversion: 1000000,
  });

  //   useEffect(() => {

  //   }, [units]);

  const onChangeSpeeds = (e) => {
    console.log(e.target.value);
    var newVal = speeds[e.target.value];
    console.log(newVal);
    const data = {
      key: e.target.value,
      unit: newVal.unit,
      conversion: newVal.conversion,
    };

    setUnits(data);
    cookie.set("speed", data.key, { expires: 99999 });
  };

  const router = useRouter();
  const { id } = router.query;
  console.log(networks);

  const GetData = () => {
    api.get(`network/${id}/tests`, {
      headers: { Authorization: `Token ${cookies.ttk}` },
    }).then(
      (res) => {
        setResults(res.data);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    GetData();
    try {
      const speedKey = cookie.get("speed");
      const speedval = speeds[speedKey];
      console.log(speedval);
      setUnits(speedval);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          {networkInfo.name || "Your Network "} Analytics on ISP Logger
        </title>
      </Head>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="mb-6">
                <div className="has-text-right">
                  <div className="field">
                    {/* <label className="label">Speed</label> */}
                    <div className="control">
                      <div className="select">
                        <select onChange={onChangeSpeeds} value={units.key}>
                          {speeds.map((item, index) => (
                            <option key={index} value={index}>
                              {item.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="subtitle is-4 has-text-centered">
                  Network Analytics for <strong>{networkInfo.name}</strong>
                </h1>
                <p className="mb-6 has-text-centered ">
                  Network ID: <code>{networkInfo.secret}</code>
                </p>
                {loading ? (
                  <>
                    <div>
                      <progress className="progress is-primary" max="100">
                        30%
                      </progress>
                    </div>
                  </>
                ) : (
                  <>
                    {results.length > 0 && results !== null ? (
                      <>
                        <LatestCard units={units} data={results[0]} />
                      </>
                    ) : (
                      <>
                        <div className="content has-text-centered">
                          <p>
                            Looks like you haven't configured a device on this
                            network to collect data.
                          </p>
                          <p>
                            To get started, install the app on a device on the
                            network you want to analyze and enter the
                            <code>Network ID</code>.
                          </p>
                          <p>Please keep it a secret.</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const cookies = parseCookies(context.req);
  console.log(id);
  console.log(cookies);
  try {
    const res = await api.get(`network/${id}/`, {
      headers: { Authorization: `Token ${cookies.ttk}` },
    });
    const networks = res.data;
    return {
      props: {
        networks,
        cookies
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

export default Network;
