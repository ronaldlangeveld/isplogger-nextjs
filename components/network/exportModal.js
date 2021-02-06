import API from '../../utils/Api';
import { saveAs } from 'file-saver';

const exportModal = ({ active, secret, toggle, token }) => {

  const url = API.defaults.baseURL;

  const exportJson = async() => {
   const getData = await API.get(`network/dl/json/${secret}`, {
      headers: { Authorization: `Token ${token}` },
    });

    const blob = new Blob([getData.data], {type: "text/json"});
    saveAs(blob, `export.json`)

  }


  const exportcsv = async() => {
    const getData = await API.get(`network/dl/csv/${secret}`, {
       headers: { Authorization: `Token ${token}` },
     });
 
     const blob = new Blob([getData.data], {type: "text/csv"});
     saveAs(blob, `export.csv`)
 
   }


  return (
    <div className={`modal ${active ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Export data</p>
          <button onClick={toggle} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">

          <div className="content">
            <p>Download a copy of your data</p>
            <ul>
              <li><a target="_blank" onClick={exportcsv} download>CSV</a></li>
              <li><a target="_blank" onClick={exportJson} download>JSON</a></li>
              <li><a>PDF Summary</a> <span className="tag is-primary">Coming soon</span></li>
            </ul>
          </div>

        </section>
        <footer className="modal-card-foot">
          <div className="has-text-centered">
            <button onClick={toggle} className="button is-primary">Done</button>
          </div>

        </footer>
      </div>
    </div>
  );
};

export default exportModal;
