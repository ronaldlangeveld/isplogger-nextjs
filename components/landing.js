import Image from 'next/image';
import Link from 'next/link';


const Landing = ({auth}) => {
  return (
    <>
      <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <span className="tag is-info mb-3">Beta</span>
                <h1 className="title is-2 is-size-3-mobile">
                  Keep track of your internet performance.
                </h1>
                <h2 className="subtitle is-4 is-size-5-mobile">
                  Automated internet speed logger for your connection at home,
                  office and servers.
                </h2>
                {
                    auth.isAuthenticated?
                    <Link href="/dashboard">
                  <button className="button is-link has-text-weight-bold is-size-6 ">Go to your dashboard</button>
                </Link>
                :
                <Link href="/register" className="button is-link has-text-weight-bold is-size-6 ">
                <button className="button is-link has-text-weight-bold is-size-6 ">Get started for free</button>
                </Link>
                }

                <br />
                <p className="mt-4">
         
                  ISP Logger is a tiny script that runs on Linux, MacOS and
                  Windows.
                  <br />
                  Analyze performance on a cloud based dashboard, accessible
                  from anywhere.
                </p>
              </div>
              <div className="column">
               <Image src="/speed_test.svg" alt="speed_test_img" width="600" height="600" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
