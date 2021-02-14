import { useEffect, useState, useContext } from "react";
import Layout from "../../components/authlayout";
// import Card from "../../components/dashboard/dashCards";
import api from "../../utils/Api";
import { parseCookies } from "../../utils/parseCookies";
// import OnBoardModal from "../../components/dashboard/onBoardModal";
import Head from "next/head";
import Link from 'next/link';
// import GoPro from "../../components/gopro";
import { AuthContext } from '../../context/Auth';
import { GetUserData } from '../../utils/getUserData';

const Settings = ({ user, token }) => {

    const initLoad = {
        first_name: user.user.first_name || "",
        last_name: user.user.last_name || "",
        avatar: user.avatar ? user.avatar.secure_url : '/ufo.jpg'
    }

    const [settData, setSettData] = useState(initLoad);

    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setSettData({
            ...settData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const sendData = {
            first_name: settData.first_name,
            last_name: settData.last_name,
        }
        await api.patch(`settings/`, sendData, {
            headers: { Authorization: `Token ${token}` },
        }).then((res) => {
            console.log(res);
            alert("Save success")
        }, (err) => {
            alert("Oops, something went wrong. ")
        });
    };

    const uploadImage = (event) => {
        // setUploading(true)
        const file = event.target.files[0];
        console.log(file)
        const formData = new FormData()
        formData.append('avatar', file);
        console.log(formData)
        api.post(`settings/`,
            formData,
            {
                headers: {
                    Authorization: `Token ${token}`,
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response)
                setSettData({
                    ...settData,
                    avatar: response.data.secure_url
                })
                //    props.SetImages([...response.data, ...props.ImageList])
                //    setUploading(false);

            }, (error) => {

                console.log(error)


            });
    }




    return (
        <>
            <Head>
                <title>Settings - ISP Logger</title>
            </Head>
            <Layout>
                <section className="section">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <div className="card">
                                <div className="card-content">
                                    <h1 className="title is-5">Settings</h1>
                                    <div className="field">
                                        <label className="label">Profile Picture</label>
                                        <div style={{ backgroundImage: `url(${settData.avatar})` }} className="profile-pic-settings rounded">

                                        </div>
                                        <p className="help">Work in progress</p>
                                        <div className="file is-link is-small mt-4 mb-4">
                                            <label className="file-label">
                                                <input onChange={uploadImage} className="file-input" type="file" name="avatar"  accept=".jpeg, .png, .jpg" />
                                                <span className="file-cta">
                                                    <span className="file-label">
                                                        Change profile picture
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        {/* <p className="has-text-weight-bold has-text-link is-clickable">Change Profile Picture</p> */}
                                    </div>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="field">
                                            <label className="label">First Name</label>
                                            <div className="control">
                                                <input onChange={handleFormChange} name="first_name" className="input" type="text" value={settData.first_name} />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">Last Name</label>
                                            <div className="control">
                                                <input onChange={handleFormChange} name="last_name" className="input" type="text" value={settData.last_name} />
                                            </div>
                                        </div>
                                        <div className="field mt-4">
                                            <div className="control">
                                                <button type="submit" className="button is-fullwidth is-primary has-text-weight-bold">Save Changes</button>
                                            </div>
                                        </div>
                                    </form>
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
    // const { slug } = context.query;
    const cookies = parseCookies(context.req);
    // console.log(slug);
    const token = cookies.ttk;
    try {
        // const res = await api.get(`provider/${slug}/`);
        const res = await api.get("user-data/", {
            headers: { Authorization: `Token ${cookies.ttk}` },
        });
        const user = res.data;
        return {
            props: {
                user,
                token
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

export default Settings;