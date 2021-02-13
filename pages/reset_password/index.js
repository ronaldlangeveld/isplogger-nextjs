import LandNav from '../../components/landNav';
import Head from 'next/head';
import {useState} from 'react';
import api from '../../utils/Api';

const ResetPassword = () => {
    const [btnLoad, setBtnLoad] = useState(false);
    const [success, setSuccess] = useState(false);


    const onSubmitResetPassword = (e) => {
        e.preventDefault();
        setBtnLoad(true);
        api.post('request-pass-reset/', {'email': e.target.email.value}).then((res) => {
            console.log(res);
            setBtnLoad(false);
            setSuccess(true);
        }, (err) => {
            console.log(err);
            setBtnLoad(false);
        });
    }

    return (
        <>
            <Head>
                <title>Password Reset - ISP Logger</title>
            </Head>
            <LandNav />
            <div className="section">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <div className="card">
                            <div className="card-content">
                                {
                                    success === false ?
                                    <>
                                    <p className="title is-4">
                                    Password Reset
                                        </p>
                                    <form onSubmit={onSubmitResetPassword}>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input name="email" className="input" type="email" />
                                        </div>
                                    </div>
                                    <div className="field mt-3">
                                        <div className="control has-text-centered">
                                           <button type="submit" className={`button is-primary has-text-weight-bold ${btnLoad ? 'is-loading':''}`}>Send reset password link</button>
                                        </div>
                                    </div>
                                </form>
                                </>
                                :
                                <p className="title has-text-centered is-4">
                                    Check your inbox. 
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;