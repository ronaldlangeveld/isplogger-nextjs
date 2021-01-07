import AddNetwork from './addNetwork';


const OnBoardModal = ({active, setmodal}) => {


    return (
        <div className={`modal ${active ? 'is-active' : ''} `}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <div>
              <h1 className="title is-4 has-text-centered">Welcome to ISP Logger</h1>
              <h2 className="subtitle is-6 has-text-centered">
                To get started, let's setup your first network.
              </h2>
                <AddNetwork />
            </div>
          </div>
        </div>
        <button
          onClick={()=> setmodal(!active)}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    )

}


export default OnBoardModal;