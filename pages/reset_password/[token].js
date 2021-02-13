import api from '../../utils/Api';
import LandNav from '../../components/landNav';
import {useState} from 'react';
import Link from 'next/link';

const ResetWithToken = ({token}) => {

    const [btnLoad, setBtnLoad] = useState(false);
    const [success, setSuccess] = useState(false);


    const onSubmitCreateNewPassword = (e) => {
        e.preventDefault();
        setBtnLoad(true);
        if(e.target.password.value === e.target.passwordConfirm.value){
        api.post('pass-create/', {'password': e.target.password.value, 'passwordConfirm': e.target.passwordConfirm.value}, {
            headers: { Authorization: `Token ${token}` }}).then((res) => {
            console.log(res);
            setBtnLoad(false);
            setSuccess(true);
        }, (err) => {
            console.log(err);
            setBtnLoad(false);
        });
    } else {
        alert("Make sure your passwords are matching.")
    }
    }


    return (
        <>
        <LandNav />
        <section className="section">
            <div className="columns is-centered">
                <div className="column is-4">
                    <div className="card">
                        <div className="card-content">
                        <h1 className="is-4 title">Create a new password</h1>
                        <form onSubmit={onSubmitCreateNewPassword}>
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
                    <label className="label">Password Confirmation</label>
                    <div className="control">
                      <input
                        name="passwordConfirm"
                        className="input"
                        type="password"
                      />
                    </div>
                  </div>
                  {
                      success ?
                      <>
                      <div className="notification is-success">
                       <div>
                        <p className="mb-3 has-text-weight-bold">Password changed successfully</p>
                        <Link href="/login">You may now login</Link>
                       </div>
                      </div>
                      </>
                      :
                      <>
                      <div className="field">
                    <div className="control">
                      <button type="submit" className={`button is-primary has-text-weight-bold ${btnLoad ? 'is-loading':''}`}>Change Password</button>
                    </div>
                  </div>
                      </>
                  }
                  
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )

}
export async function getServerSideProps(context) {
    const { token } = context.query;
    console.log(token);
    try {
        const res = await api.get(`request-pass-reset?token=${token}`);
        const resdata = res.data;

        return {
            props: {
                token
            },
        };
    } catch (err) {
        console.log(err)
          if (context.res) {
            context.res.writeHead(302, {
              Location: "/404",
            });
            context.res.end();
          }

        return {};
    }
}

export default ResetWithToken;