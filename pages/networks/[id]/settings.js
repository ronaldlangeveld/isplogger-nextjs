import { useRouter } from "next/router";
import Link from 'next/link';
import api from "../../../utils/Api";
import { parseCookies } from "../../../utils/parseCookies";
import Layout from "../../../components/authlayout";
import { useEffect, useState, useContext } from "react";
import LatestCard from "../../../components/network/latestCard";
import Head from "next/head";
import cookie from "js-cookie";

const NetworkSettings = ({ initData, cookies }) => {
    // bytes to mbps = 1000000
    const router = useRouter();
    const { id } = router.query;

    const initState = {
        name: "",
        secret: "",
        download_service: 0,
        upload_service: 0
    }

    const [sett, setSett] = useState(initState)

    useEffect(() => {

        setSett({
            ...sett,
            name: initData.name,
            secret: initData.secret,
            download_service: initData.download_service/1000000 || 0,
            upload_service: initData.upload_service/1000000 || 0
        })

    }, [initData])

    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setSett({
            ...sett,
            [name]: value
        })
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const sendData = {
            name: sett.name,
            secret: sett.secret,
            download_service: sett.download_service*1000000,
            upload_service: sett.upload_service*1000000
        }
      await api.post(`network/${id}/settings/`, sendData, {
            headers: { Authorization: `Token ${cookies.ttk}` },
        }).then((res) => {
            console.log(res);
            alert("Save success")
        }, (err) => {
            alert("Oops, something went wrong. ")
        });
    };

    return (
        <>
            <Layout>
                <Head>
                    <title>Network Settings</title>
                </Head>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-6">
                                    <p className="mb-2"><Link href={`/networks/${id}`}>Go Back</Link></p>
                                    <h1 className="title">Change network settings</h1>
                                    <div className="card">
                                        <div className="card-content">
                                            <form onSubmit={handleFormSubmit}>
                                            <div className="field">
                                                <label className="label">Name</label>
                                                <div className="control">
                                                    <input onChange={handleFormChange} name="name" required className="input" type="text" placeholder="Name" value={sett.name} />
                                                </div>
                                            </div>
                                            <hr />
                                            <p className="subtitle">ISP Settings <span className="tag">Optional</span></p>
                                            <p className="help mb-3">These settings refers to the speed you are paying your ISP for, eg 100mbps. Refer to your ISP invoice for details. <br/>If you're not sure, leave it 0</p>
                                            <label className="label">Download Speed</label>
                                            <div className="field has-addons">
                                                <p className="control">
                                                    <input onChange={handleFormChange}  name="download_service" className="input" type="number" placeholder="eg 50" value={parseFloat(sett.download_service).toFixed(0)} />
                                                </p>
                                                <p className="control">
                                                    <a className="button is-static">
                                                        Mbps
                                                    </a>
                                                </p>
                                            </div>
                                            <label className="label">Upload Speed</label>
                                            <div className="field has-addons">
                                                <p className="control">
                                                    <input onChange={handleFormChange}  name="upload_service" className="input" type="number" placeholder="eg 50" value={parseFloat(sett.upload_service).toFixed(0)} />
                                                </p>
                                                <p className="control">
                                                    <a className="button is-static">
                                                        Mbps
                                                    </a>
                                                </p>
                                            </div>
                                            <button type="submit" className="button is-primary mt-2">Save Changes</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const cookies = parseCookies(context.req);
    console.log(id);
    console.log(cookies);
    try {
        const res = await api.get(`network/${id}/settings/`, {
            headers: { Authorization: `Token ${cookies.ttk}` },
        });
        const initData = res.data;
        return {
            props: {
                cookies,
                initData
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

export default NetworkSettings;