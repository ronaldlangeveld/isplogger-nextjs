import api from '../../utils/Api';
import Head from 'next/head';
import LandNav from '../../components/landNav';
import Footer from '../../components/footer';


const Provider = ({ provider, stats }) => {

    return (
        <>
            <Head>
                <title>{provider.display_name ? provider.display_name : provider.name} speed tests on ISP Logger</title>
                <meta name="title" content={`${provider.display_name ? provider.display_name : provider.name} speed tests on ISP Logger`} />
                <meta name="description" content= {`Browse stats speed test for internet service provider ${provider.display_name ? provider.display_name : provider.name} on ISP Logger`}  />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://isplogger.com/" />
                <meta property="og:title" content={`${provider.display_name ? provider.display_name : provider.name} speed tests on ISP Logger`}  />
                <meta property="og:description" content={`Browse speed test stats for internet service provider ${provider.display_name ? provider.display_name : provider.name} speed tests on ISP Logger`} />
                <meta property="og:image" content="https://isplogger.com/results.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://isplogger.com/" />
                <meta property="twitter:title" content={`${provider.display_name ? provider.display_name : provider.name} speed tests on ISP Logger`}  />
                <meta property="twitter:description" content={`Browse speed test stats for internet service provider ${provider.display_name ? provider.display_name : provider.name} on ISP Logger`} />
                <meta property="twitter:image" content="https://isplogger.com/results.png" />
            </Head>
            <LandNav />

            <section className="hero is-medium">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-7">
                            <p className="tag mb-4">This page is still work in progress</p>
                            <div className="card">
  <div className="card-content">
      <p className="has-text-weight-bold">⚡ ISP Logger</p>
    <p className="title has-text-centered-mobile mt-4">
    {provider.display_name ? provider.display_name : provider.name}
    </p>
    <p className="subtitle has-text-centered-mobile">
    {provider.country.name}
    </p>
    <nav className="level">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Total Tests</p>
                                    <p className="title">{stats.total_tests}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Avg Download</p>
                                    <p className="title">{parseFloat(stats.avg_down / 1000000).toFixed(2)} Mbps</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Avg Upload</p>
                                    <p className="title">{parseFloat(stats.avg_up / 1000000).toFixed(2)} Mbps</p>
                                </div>
                            </div>
                        </nav>
  </div>
  {/* <footer className="card-footer">
    <p className="card-footer-item">
      <span>
        View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
      </span>
    </p>
    <p className="card-footer-item">
      <span>
        Share on <a href="#">Facebook</a>
      </span>
    </p>
  </footer> */}
</div>
                        {/* <h1 className="title">
                            {provider.display_name ? provider.display_name : provider.name}
                        </h1>
                        <h2 className="subtitle">
                            {provider.country.name}
                        </h2> */}
                     
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query;
    // const cookies = parseCookies(context.req);
    console.log(slug);
    // console.log(cookies);
    try {
        const res = await api.get(`provider/${slug}/`);
        const provider = res.data.provider;
        const stats = res.data.stats;
        console.log(res.data)
        return {
            props: {
                provider,
                stats,
                slug
            },
        };
    } catch (err) {
        console.log(err)
        //   if (context.res) {
        //     context.res.writeHead(302, {
        //       Location: "/404",
        //     });
        //     context.res.end();
        //   }

        return {};
    }
}


export default Provider;