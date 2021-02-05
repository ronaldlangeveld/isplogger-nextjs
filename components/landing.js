import Image from 'next/image';
import LandNav from './landNav';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import API from '../utils/Api';
const Landing = ({ auth }) => {


  var initialData = {
    tests: 0,
    download: 0,
    upload: 0,
    networks: 0
  }


  const [stats, setStats] = useState(initialData)

useEffect(() => {
  API.get('open-stats/').then((res)=> {
    var data = res.data;
    setStats({
      ...stats,
      tests: data.tests,
      download: data.download,
      upload: data.upload,
      networks: data.networks
    })
  }, (err) => {
    console.log(err)
  })

}, [])

  return (
    <>
     <LandNav />

      <section className="hero is-white is-medium is-bold">
      <div className="notification is-primary mb-6"><p className="has-text-centered has-text-weight-bold is-size-5">I'm live on Product Hunt! <a href="https://www.producthunt.com/posts/isp-logger" target="_blank">Join the conversation</a></p></div>

        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-8">
                <span className="tag is-info mb-3">Beta</span>
                <h1 className="title is-1 is-size-3-mobile">
                  Keep track of your internet performance.
                </h1>
                <h2 className="subtitle is-3 is-size-5-mobile">
                  Automated internet speed logger for your connection at home,
                  office and servers.
                </h2>
                <Link href="/register" className="button is-link has-text-weight-bold is-size-6 ">
                      <button className="button is-primary has-text-weight-bold is-size-4-desktop ">Get started for free*</button>
                    </Link>

                  <p className="help">* Free features limited. Premium billed $12 monthly.</p>

                <br />
                <p className="mt-4">
                  ISP Logger is a tiny script that runs on Linux, MacOS and
                  Windows that runs via a Docker package.
                  <br />
                  Analyze performance on a cloud based dashboard, accessible
                  from anywhere.
                </p>
              </div>
              <div className="column">
                <img src="/speed_test.svg" alt="speed_test_img" />
              </div>
            </div>
            <div className="has-text-left">
            <p className="title">Live stats from the cloud</p>
            <ul>
              <li><strong>{stats.tests}</strong> tests logged</li>
              <li><strong>{parseFloat(stats.download / 1000000).toFixed(2)} mbps </strong>is the fastest download speed logged so far</li>
              <li><strong>{parseFloat(stats.upload / 1000000).toFixed(2)} mbps </strong>is the fastest upload speed logged so far</li>
              <li><strong>{stats.networks}</strong> networks are currently being monitored by ISP Logger</li>
            </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="hero is-medium is-link is-bold">
        <div className="hero-body">

          <div className="container">
          <div className="has-text-centered">
            <h1 className="title">Full summary to indicate the overall performance of your network</h1>
          <img className="rounded shadow" src="/stats.png" />
          <h1 className="title mt-6">Don't miss a beat and find the less performant times </h1>
          <img className="rounded shadow" src="/results.png" />
          </div>
            </div>

        </div>
      </section>


      <footer className="footer">
  <div className="content has-text-centered">
    <p>
      <strong>ISP Logger</strong> by <a href="https://www.ronaldlangeveld.com" target="_blank">Ronald Langeveld</a>
      <p>Copyright © 2021 ISP Logger</p>

    </p>
  </div>
</footer>
    
    </>
  );
};



export default Landing;
