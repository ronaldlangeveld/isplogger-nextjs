import Image from 'next/image';
import LandNav from './landNav';
import Link from 'next/link';

const Landing = ({ auth }) => {
  return (
    <>
     <LandNav />
      <section className="hero is-white is-large is-bold">
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
    </>
  );
};



export default Landing;
