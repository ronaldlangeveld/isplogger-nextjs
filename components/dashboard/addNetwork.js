import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import api from "../../utils/Api";
import {useRouter} from 'next/router';

const AddNetwork = () => {
  const { state } = useContext(AuthContext);
    const history = useRouter();
  const SubmitNetwork = (e) => {
    e.preventDefault();
    console.log(e.target);
    let data = {
      name: e.target.name.value,
    };
    console.log(data);
    api
      .post("networks/", data, {
        headers: { Authorization: `Token ${state.token}`, 'Content-Type': 'application/json' },
      })
      .then(
        (res) => {
          console.log(res);
          history.push(`/networks/${res.data.id}`);
        },
        (err) => {
          console.log(err);
          alert(err)
          //   history.push("/dashboard");
        }
      );
  };

  return (
    <form onSubmit={SubmitNetwork}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            name="name"
            className="input"
            type="text"
            placeholder="Give it a name, eg Home, Office, Server, Mom's fibre, etc"
          />
        </div>
      </div>

      <div>
        <button type="submit" className="button is-primary">
          Create Network
        </button>
      </div>
    </form>
  );
};

export default AddNetwork;
