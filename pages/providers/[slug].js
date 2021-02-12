import api from '../../utils/Api';
import Head from 'next/head';
import LandNav from '../../components/landNav';
import Footer from '../../components/footer';


const Provider = ({ provider, stats }) => {

    return (
        <>
            <Head>
                <title>{provider.display_name ? provider.display_name : provider.name} on ISP Logger</title>
                <meta name="title" content="ISP Logger - Internet speed analytics" />
                <meta name="description" content="ISP Logger - Internet speed analytics" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://isplogger.com/" />
                <meta property="og:title" content="ISP Logger - Internet speed analytics" />
                <meta property="og:description" content="Keep track of your internet speed." />
                <meta property="og:image" content="https://isplogger.com/results.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://isplogger.com/" />
                <meta property="twitter:title" content="ISP Logger - Internet speed analytics" />
                <meta property="twitter:description" content="Keep track of your internet speed." />
                <meta property="twitter:image" content="https://isplogger.com/results.png" />
            </Head>
            <LandNav />

            <section className="hero is-medium">
                <div className="hero-body">
                    <div className="container">
                        <p>This page is still work in progress</p>
                        <h1 className="title">
                            {provider.display_name ? provider.display_name : provider.name}
                        </h1>
                        <h2 className="subtitle">
                            {provider.country.name}
                        </h2>
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