import api from '../../utils/Api';
import Head from 'next/head';
import LandNav from '../../components/landNav';
import Footer from '../../components/footer';
import { useEffect, useState, useContext } from 'react';
import Comment from '../../components/providers/comment';
import { parseCookies } from '../../utils/parseCookies';
import { AuthContext } from '../../context/Auth';


const Provider = ({ provider, stats, slug, token }) => {

    const [comments, setComments] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const updateComments = async() => {
        api.get(`provider/${slug}/comments/`).then((res) => {
            if (res.data.length > 0) {
                setComments(res.data)
            }
        }, (err) => {
            console.log(err);
        })
    }

    useEffect(() => {

       updateComments()
       

    }, [slug])

    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            dispatch({ type: "LOGIN", payload: { token: token } });
        }
    }, [token]);


    const submitComment = (e) => {
        e.preventDefault();
        console.log(e.target.comment.value)
        const data = {
            content: e.target.comment.value
        }
        setDisabled(true);
        api.post(`provider/${slug}/comments/add/`, data, {
            headers: { Authorization: `Token ${token}` },
          }).then((res) => {
        
            updateComments();
            setDisabled(false);
            e.target.comment.value = ""

          }, (err) => {
              console.log(err);
              setDisabled(false);
          })

    }


    return (
        <>
            <Head>
                <title>{provider.display_name ? provider.display_name : provider.name} speed tests logged on ISP Logger</title>
                <meta name="title" content={`${provider.display_name ? provider.display_name : provider.name} speed tests logged on ISP Logger`} />
                <meta name="description" content={`Browse stats speed test for internet service provider ${provider.display_name ? provider.display_name : provider.name} on ISP Logger`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://isplogger.com/" />
                <meta property="og:title" content={`${provider.display_name ? provider.display_name : provider.name} speed tests logged on ISP Logger`} />
                <meta property="og:description" content={`Browse speed test stats for internet service provider ${provider.display_name ? provider.display_name : provider.name} speed tests logged on ISP Logger`} />
                <meta property="og:image" content="https://isplogger.com/results.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://isplogger.com/" />
                <meta property="twitter:title" content={`${provider.display_name ? provider.display_name : provider.name} speed tests logged on ISP Logger`} />
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
                                        <hr />
                                        {
                                            token ?
                                                <div>
                                                    <form onSubmit={submitComment}>
                                                    <div className="field">
                                                        <label className="label has-text-left">Write a review</label>
                                                        <div className="control">
                                                            <textarea disabled={disabled} name="comment" className="textarea"></textarea>
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="button is-size-7 is-primary has-text-weight-bold">Submit</button>
                                                    <hr/>
                                                    </form>
                                                </div>
                                                :
                                                <p className="has-text-centered">You need to be <a href="/login">logged in</a> to write a review</p>
                                        }
                                                                            <p className="mb-4 mt-4">Reviews <strong>({comments.length})</strong></p>
                                        {
                                            comments.length > 0 ?

                                                comments.map((item, index) => (
                                                    <div key={index} className="py-4">
                                                        <Comment Data={item} />
                                                    </div>
                                                ))
                                                :
                                                <>
                                                <p>No reviews yet. Be the first to review <strong>{provider.display_name ? provider.display_name : provider.name}</strong></p>
                                                </>
                                        }
                                    </div>
                                </div>

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
    const cookies = parseCookies(context.req);
    console.log(slug);
    const token = cookies.ttk;
    try {
        const res = await api.get(`provider/${slug}/`);
        const provider = res.data.provider;
        const stats = res.data.stats;
        console.log(res.data)
        return {
            props: {
                provider,
                stats,
                slug,
                token
            },
        };
    } catch (err) {
        console.log(err)
        return {};
    }
}


export default Provider;