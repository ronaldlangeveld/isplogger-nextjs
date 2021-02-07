import { useEffect, useState, useContext } from "react";
import Layout from "../components/authlayout";
import api from "../utils/Api";
import { parseCookies } from "../utils/parseCookies";
import Head from "next/head";
import Link from 'next/link';
import {AuthContext} from '../context/Auth';
import {useRouter} from 'next/router';
import {GetUserData} from '../utils/getUserData';
import cookie from 'js-cookie';
import dynamic from 'next/dynamic';


const DynamicComponentWithNoSSR = dynamic(
    () => Paddle = window.Paddle,
    { ssr: false }
  )

const Upgrade = () => {

    const {state, dispatch} = useContext(AuthContext);

    const router = useRouter();
   

    const getData = async() => {
        let token = cookie.get('ttk');
        let data = await GetUserData();
        console.log(data);
        dispatch(
            {
                type: "LOGIN",
                payload: { token: token, user_data: data },

            });

    }

    const handlePayment  = (e) => {
        Paddle.Checkout.open({
            product:  643089,
            email:  state.user_data.user.email || null,
            successCallback: (data, err) => {
                if(data){
                    api.post('make-sub/', data, {
                        headers: { Authorization: `Token ${state.token}` },
                      }).then((res) => {
                          console.log(res);
                          alert("Success");
                            getData();
                          router.push('/dashboard');
                      }, (err) => {
                          alert("something went wrong please contact support");
                      })
                }
                }
                })
            };


  useEffect(() => {

  }, [state])

    return (
        <Layout>
            <Head>
                <title>Upgrade to Pro</title>
            </Head>
            <section className="hero">
  <div className="hero-body">
    <div className="container">

        <div className="columns is-centered">
        <div className="column is-6">
        <h1 className="title has-text-centered">
        Upgrade to Pro
      </h1>
        <img src="/heart.svg" />

                {/* <div className="notification is-danger">
                <p className="has-text-centered">Get 50% off forever when you use coupon code <strong>earlyadopter2021</strong></p>
              </div> */}
                    <div className="box">
                        <p className="has-text-centered"><span className="has-text-weight-strong is-size-1">$12</span>/mo</p>
                        <hr/>
                        <ul className="has-text-centered is-size-4-desktop">
                        <li>Unlimited dashboard results history</li>
                        <li>Export Results to JSON and CSV</li>
                        <li>Weekly Email Reports <span className="tag is-primary">Soon</span></li>
                        <li>Email Support</li>
                        </ul>
                        <hr/>
                       <div className="has-text-centered">
                       <button disabled={state.isAuthenticated ? false : true} onClick={handlePayment} className="button has-text-weight-bold is-primary is-size-4-desktop">Upgrade $12/mo</button>
                       </div>
                    </div>
                </div>
               
        </div>
    </div>
  </div>
</section>
        </Layout>
    )

}

export default Upgrade;