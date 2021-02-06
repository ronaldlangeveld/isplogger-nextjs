const NetworkIdModal = ({active, secret, toggle}) => {
  return (
    <div className={`modal ${active ? 'is-active': ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Network ID</p>
          <button onClick={toggle} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
            <h1 className='is-size-5'>Here's your Network ID:</h1>
            <code>{secret}</code>
            <h1 className='is-size-6 mt-3'>Please keep your ID safe and don't share it with anyone.</h1>
        </section>
        <footer className="modal-card-foot">
          <button onClick={toggle} className="button is-primary">Got it!</button>
        </footer>
      </div>
    </div>
  );
};

export default NetworkIdModal;
