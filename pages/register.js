import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useRouter } from "next/router";
import api from "../utils/Api";
import cookie from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import { validateEmail } from '../utils/validateEmail';
import LandNav from '../components/landNav';

const Register = () => {
  const history = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const [invalid, setInvalid] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [success, setSuccess] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);

  const [validForm, setValidForm] = useState({
    'email': false,
    'username': false
  })

  const registerUser = (e) => {
    setValidForm({
      'email': false,
      'username': false
    })
    setInvalid(false);
    e.preventDefault();
    console.log(e.target);
    setBtnLoad(true);
    var email = e.target.email.value;
    var username = e.target.username.value;
    var password = e.target.password.value;
    var password2 = e.target.password_two.value;

    if (password === password2) {
      api
        .post("create-account/", {
          email: email,
          username: username,
          password: password,
          password_two: password2
        })
        .then(
          (res) => {
            setSuccess(true);
            console.log(res);
            cookie.set("ttk", res.data.token, { expires: 365 });
            dispatch({ type: "LOGIN", payload: {token: res.data.token} });
            console.log(state);
            history.push("/dashboard");
            setBtnLoad(false);
            setInvalid(false);
          },
          (err) => {
            console.log(err.response);
            setBtnLoad(false);
            setValidForm(err.response.data)
            //   history.push("/dashboard");
          }
        );
    } else {
      alert("Passwords doesn't match");
      setBtnLoad(false);
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [state]);


  return (
    <>
      <Head>
        <title>Register - ISP Logger</title>
      </Head>
      <LandNav />
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6">
 
              <div className="card">
                <div className="card-content">
                  <h1 className="is-4 title">⚡ ISP Logger</h1>
                  <h2 className="subtitle is-6">Create your account</h2>
                  <form onSubmit={registerUser}>
                    <div className="field">
                      <label className="label">Email</label>
                      {validForm.email ?
                        <>
                          <p className="help has-text-danger">Email already in use.</p>
                        </>
                        :
                        <>
                        </>

                      }
                      <div className="control">
                        <input name="email" className="input" type="email" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Username</label>
                      {validForm.username ?
                        <>
                          <p className="help has-text-danger">Username already in use.</p>
                        </>
                        :
                        <>
                        </>

                      }
                      <div className="control">
                        <input name="username" className="input" type="text" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          name="password"
                          className="input"
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Confirm Password</label>
                      <div className="control">
                        <input
                          name="password_two"
                          className="input"
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="has-text-centered">
                      {success ? (
                        <div className="notification is-success">
                          <p className="has-text-weight-bold">
                            Successfully created an account. Taking you to your dashboard.
                      </p>
                        </div>
                      ) : (
                          <>
                            <div className="has-text-centered">
                              <button
                                // disabled={btnDisable}
                                type="submit"
                                className={`mt-4 button is-primary is-size-6 is-fullwidth ${btnLoad ? "is-loading" : ""
                                  }`}
                              >
                                <strong>Create Account</strong>
                              </button>
                            </div>
                          </>
                        )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
