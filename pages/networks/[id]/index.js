import { useRouter } from "next/router";
import Link from 'next/link';
import api from "../../../utils/Api";
import { parseCookies } from "../../../utils/parseCookies";
import Layout from "../../../components/authlayout";
import { useEffect, useState, useContext } from "react";
import LatestCard from "../../../components/network/latestCard";
import Head from "next/head";
import cookie from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import Chart from "../../../components/network/networkchart";
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import ResultsTable from '../../../components/network/resultsTable';
import NetworkIdModal from '../../../components/network/networkIdModal';
import moment from "moment";
import { AuthContext } from '../../../context/Auth';
import ExportModal from '../../../components/network/exportModal';
import { Grading } from '../../../components/network/grading';
import GoPro from '../../../components/gopro';

const Network = ({ networks, cookies, latest }) => {
  const { state } = useContext(AuthContext);
  const [networkInfo, setNetworkInfo] = useState(networks || null);
  const [latestTest, setLatest] = useState(latest || null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const yesterday = new Date(today);

  const [range, setRange] = useState([yesterday.setDate(yesterday.getDate() - 2), new Date()]);
  const [filterBtn, setFilterBtn] = useState(false);

  const [idModal, setIdModal] = useState(false);
  const [dlModal, setdlModal] = useState(false);

  const [grade, setGrade] = useState(null);

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

  const [speeds, setSpeeds] = useState(speedunits || "");

  const [units, setUnits] = useState({
    key: 2,
    unit: "Mbps",
    conversion: 1000000,
  });

  useEffect(() => {

    if (networks.upload_service !== null && networks.download_service !== null && latest && networks.upload_service !== 0 && networks.download_service !== 0) {
      var maxUp = networks.upload_service || 0;
      var maxDown = networks.download_service || 0;
      var avgUp = latest.avg_up || 0;
      var avgDown = latest.avg_down || 0;

      // maxUp, maxDown, avgUp, avgDown
      const g = Grading(maxUp, maxDown, avgUp, avgDown);
      setGrade(g)
    }

  }, [networks, latest])

  useEffect(() => { }, [units]);

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
    api
      .get(`network/${id}/tests/`, {
        headers: { Authorization: `Token ${cookies.ttk}` },
      })
      .then(
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
      if (speedKey) {
        const speedval = speeds[speedKey];
        console.log(speedval);
        setUnits(speedval);
      } else {
        const speedval = speeds[2];
        setUnits(speedval)
      }
    } catch (err) {
      console.log(err);
    }
  }, [state]);

  const onFilter = () => {
    if (range[0] > new Date() && range[1] > new Date()) {
      alert("Oops, you cannot select future dates.");
    } else {
      setFilterBtn(true);
      api
        .get(
          `network/${id}/tests/?start=${moment(
            range[0]
          ).toISOString()}&end=${moment(range[1]).toISOString()}`,
          {
            headers: { Authorization: `Token ${cookies.ttk}` },
          }
        )
        .then(
          (res) => {
            setResults(res.data);
            setFilterBtn(false);
          },
          (err) => {
            console.log(err);
            setFilterBtn(false);
          }
        );
    }
  };

  const toggleNetModal = () => {
    setIdModal(!idModal);
  };

  const toggleDlModal = () => {
    console.log(results.length);
    if(state.user_data.pro !== true){
      router.push('/upgrade');
    }
    if(results.length === 0 || results === null){
     alert('Oops, you need to perform some tests first before you can export results.')
    } else {
      setdlModal(!dlModal);
    }
  };


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
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <Link href={`/networks/${id}/settings`}><span className="is-size-6 has-text-weight-bold has-text-link is-clickable">Settings</span></Link>
                  </div>
                  <div className="level-item">
                 <span onClick={toggleDlModal} className="is-size-6 has-text-weight-bold has-text-link is-clickable">Export Data</span>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <div className="field">
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
                </div>
              </nav>

              <h1 className="subtitle is-4 has-text-centered">
                Network Analytics for <strong>{networkInfo.name}</strong>
              </h1>
              <p className="mb-6 has-text-centered ">
                <code onClick={toggleNetModal} className="is-clickable">Click to see the Network ID</code>
                {/* <br/>
                <a target="_blank" href={`/networks/${id}/test`} className="mt-4 button is-primary">Test now</a> */}
              </p>
              <NetworkIdModal active={idModal} secret={networkInfo.secret} toggle={toggleNetModal} />
              {latest !== null ? (
                <>
                  <LatestCard units={units} data={latest} grade={grade} />
                </>
              ) : (
                  <>
                  </>
                )}
            </div>
          </div>
        </div>
      </section>
      <hr />
      {latest ? (
        <>
          {loading ? (
            <div className="has-text-centered mt-6">
              <ClipLoader size={50} color={"#123abc"} loading={true} />
            </div>
          ) : (
              <section>

                <div className="container">
                  {results.length > 0 && results !== null ? (
                    <>

                      {
                        state.user_data ?
                          <>
                            {
                              state.user_data.pro ?
                                <>
                                  <ExportModal active={dlModal} secret={networkInfo.secret} toggle={toggleDlModal} token={state.token} />

                                </>
                                :
                               <GoPro/>
                            }
                          </>
                          :
                          <>
                          </>
                      }

                      <div className="has-text-right mx-4 my-4">
                        <br />
                        <DateRangePicker onChange={setRange} value={range} />
                        <br />

                        {
                          state.user_data ?
                            <>
                              {
                                state.user_data.pro ?
                                  <button
                                    onClick={onFilter}
                                    className={`button is-primary mt-2 ${filterBtn ? "is-loading" : ""
                                      }`}
                                  >
                                    Filter
                       </button>
                                  :
                                  <Link href="/upgrade">
                                    <button className="button is-primary mt-2">
                                      Upgrade to Pro
                       </button>
                                  </Link>
                              }
                            </>
                            :
                            <>
                            </>
                        }

                      </div>
                      <Chart units={units} data={results} />

                      <ResultsTable units={units} data={results} />
                    </>
                  ) : (
                      <></>
                    )}
                </div>
              </section>
            )}
        </>
      ) : (
          <>
            <div className="content has-text-centered">
              <p>
                Looks like you haven't configured a device on this network to
                collect data.
            </p>
              <p>
                To get started, follow check out the <a href="/blog/setup-guide" target="_blank">Setup Guide</a> and enter the
              <code>Network ID</code>.
            </p>
              <p>Please keep it a secret.</p>
            </div>
          </>
        )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const cookies = parseCookies(context.req);
  // console.log(id);
  // console.log(cookies);
  try {
    const res = await api.get(`network/${id}/`, {
      headers: { Authorization: `Token ${cookies.ttk}` },
    });
    const networks = res.data.network;
    const latest = res.data.latest;
    return {
      props: {
        networks,
        latest,
        cookies,
        id
      },
    };
  } catch (err) {
    if (context.res) {
      context.res.writeHead(302, {
        Location: "/404",
      });
      context.res.end();
    }

    return {};
  }
}

export default Network;
