import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useRouter } from "next/router";
import api from "../utils/Api";
import cookie from "js-cookie";
import Head from "next/head";
import Link from "next/link";
const Login = () => {
  const history = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const [invalid, setInvalid] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [success, setSuccess] = useState(false);

  const loginUserIn = (e) => {
    setInvalid(false);
    e.preventDefault();
    console.log(e.target);
    setBtnLoad(true);
    api
      .post("login-email/", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then(
        (res) => {
          setSuccess(true);
          console.log(res);
          cookie.set("ttk", res.data.token, { expires: 365 });
          dispatch({ type: "LOGIN", payload: {token: res.data.token}});
          console.log(state);
          history.push("/dashboard");
          setBtnLoad(false);
          setInvalid(false);
        },
        (err) => {
          console.log(err);
          setBtnLoad(false);
          setInvalid(true);
          //   history.push("/dashboard");
        }
      );
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [state]);

  return (
    <>
      <Head>
        <title>Login - ISP Logger</title>
      </Head>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-4">
            {invalid ? (
              <div className="notification is-danger">
                <p className="has-text-weight-bold">
                  Invalid email or password
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="card">
              <div className="card-content">
                <h1 className="is-4 title">⚡ ISP Logger</h1>
                <h2 className="subtitle is-6">Sign in to your account</h2>
                <form onSubmit={loginUserIn}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input name="email" className="input" type="email" />
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
                  {success ? (
                    <div className="notification is-success">
                      <p className="has-text-weight-bold">
                        Successfully logged in. Taking you to your dashboard.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="has-text-centered">
                        <button
                          type="submit"
                          className={`mt-4 button is-primary is-size-6 is-fullwidth ${
                            btnLoad ? "is-loading" : ""
                          }`}
                        >
                          <strong>Login</strong>
                        </button>
                      </div>
                    </>
                  )}
                </form>

                <div className="mt-6">
                  Don't have an account? <Link href="/register">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
