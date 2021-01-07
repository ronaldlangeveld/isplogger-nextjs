import Layout from "../../components/authlayout";
import AddNetwork from '../../components/dashboard/addNetwork';

const NewNetwork = () => {

    return (
        <Layout>

          <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-7">
                        <h1 className="title">Add a new network</h1>
                        <AddNetwork />
                    </div>
                </div>
            </div>
          </section>

        </Layout>
    )
}


export default NewNetwork;