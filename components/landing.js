import Image from 'next/image';
import LandNav from './landNav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import API from '../utils/Api';
import Humanize from 'humanize-plus';

const Landing = ({ auth, statistics }) => {

  console.log(auth)
  var initialData = {
    tests: statistics.tests || 0,
    download: statistics.download || 0,
    upload: statistics.upload || 0,
    networks: statistics.networks || 0,
    users: statistics.users || 0
  }

  // var isps = providers || [];


  const [stats, setStats] = useState(initialData)

  // useEffect(() => {
  //   API.get('open-stats/').then((res) => {
  //     var data = res.data;
  //     setStats({
  //       ...stats,
  //       tests: data.tests,
  //       download: data.download,
  //       upload: data.upload,
  //       networks: data.networks
  //     })
  //   }, (err) => {
  //     console.log(err)
  //   })

  // }, []);

  return (
    <>
      <LandNav />
      <section className="hero is-dark is-large is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8 has-text-centered">
                <h1 className="title is-1 is-size-3-mobile ">
                  Internet Speed Analytics
                </h1>
                <h2 className="subtitle is-3 is-size-5-mobile ">
                  Automated internet speed logger for your connection at home,
                  office and servers.
                </h2>
                <div>
                  {
                    auth.isAuthenticated ?
                      <>
                        <Link href="/dashboard">
                          <button className="button is-primary has-text-weight-bold is-size-4-desktop ">Go to your dashboard</button>
                        </Link>
                      </>
                      :
                      <Link href="/register">
                        <button className="button is-primary has-text-weight-bold is-size-4-desktop ">Try for free. No credit card required</button>
                      </Link>
                  }
                </div>
                <br />
                <p className="mt-4 is-size-5  ">
                  Join <strong>{Humanize.intComma(stats.users)}</strong> users who have had their internet speeds tested <strong>{Humanize.intComma(stats.tests)}</strong> times.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="hero is-light">
        <div className="hero-body">
          <div>
            <div className="has-text-centered">
              <img style={{ marginTop: '-12%' }} className="rounded shadow" src="/screenie.png" />
              <div className="container mt-6">
                <h1 className="title is-3 is-size-4-mobile">ISP Logger tests your internet speed every hour, stores your results and grades it's performance.</h1>
                <h2 className="subtitle is-5 is-size-6-mobile">Designed as a tool to monitor and analyze the stability of your internet speed to ensure you get from your Internet Service Provider what you're paying for.</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export default Landing;
