import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useRouter } from 'next/router'
import api from '../utils/Api';
import cookie from 'js-cookie';

const Login = () => {
  const history = useRouter();
  const { state, dispatch } = useContext(AuthContext);


  const loginUserIn = (e) => {
      e.preventDefault();
      console.log(e.target)
      // const creds = new FormData(e.target);
      // console.log(creds)
      api.post('api-token-auth/', {"username": e.target.username.value, "password": e.target.password.value}).then((res) => {
          console.log(res);
          cookie.set("ttk", res.data.token, {expires: 365})
          dispatch({ type: "LOGIN" });
          console.log(state);
          history.push("/dashboard");
      }, (err) => {
          console.log(err);
        //   history.push("/dashboard");
      })
  };


  useEffect(() => {
    if (state.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [state]);

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-5">
          <div className="box">
            <h1 className="is-4 title has-text-centered">
            ⚡ ISP Logger
            </h1>
            <h2 className="subtitle is-6 has-text-centered">
              Welcome back. Please login to your account.
            </h2>
            <form onSubmit={loginUserIn}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input name="username" className="input" type="text" />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input name="password" className="input" type="password" />
              </div>
            </div>

            <button type="submit" className="mt-4 button is-primary is-fullwidth">
              <strong>Login</strong>
            </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;