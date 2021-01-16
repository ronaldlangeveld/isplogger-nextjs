const NetworkIdModal = ({active, secret, toggle}) => {
  return (
    <div class={`modal ${active ? 'is-active': ''}`}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Network ID</p>
          <button onClick={toggle} class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <h1 className='is-size-5'>Here's your Network ID:</h1>
            <code>{secret}</code>
            <h1 className='is-size-6 mt-3'>Please keep your ID safe and don't share it with anyone.</h1>
        </section>
        <footer class="modal-card-foot">
          <button onClick={toggle} class="button is-primary">Got it!</button>
        </footer>
      </div>
    </div>
  );
};

export default NetworkIdModal;
