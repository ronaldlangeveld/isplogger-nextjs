import Image from 'next/image';
import LandNav from './landNav';
import Link from 'next/link';

const AboutComp = ({ auth }) => {


    const profile = {
        height: '200px',
        width: '200px',
        borderRadius: '100%'
    }

  return (
    <>
     <LandNav />

<section className="hero is-large is-dark">
  <div className="hero-body">
      <p className="is-size-1 has-text-centered">⚡</p>
    <p className="title is-1 has-text-centered">
     About ISP Logger
    </p>
    <p className="subtitle is-3 has-text-centered">
      Hello, I'm <a className="has-text-link" href="https://www.ronaldlangeveld.com" target="_blank">Ronald</a>, the founder, and developer of ISP Logger. 
    </p>
    <p className="has-text-centered is-size-3">Let me tell you a bit more about ISP Logger</p>
  </div>
</section>

<section className="hero is-medium is-light">
  <div className="hero-body">
      <div className="has-text-centered">
        <img style={profile} src="/me.png" />
      </div>
    <p className="is-size-3 has-text-centered mt-6">
     Like most of us, I'm an avid internet user. 
     <br/> However not everyday is sunshine and daisies, especially when your ISP starts giving you problems. 
     <br/> In my case, the connection was incredibly inconsistent and unstable. 
     <br/> One minute it would be great at nearly <strong>30 Mbps</strong> and a few minutes later the page won't even load and you realise it's not even <strong>1 Mbps </strong> or completely <strong>dead</strong>.
    </p>
    <p className="is-size-3 has-text-centered">
       The worst is when the ISP you pay every month suddenly don't deliver and they 'claim' there is nothing wrong with my connection.
    </p>
  </div>
</section>

<section className="hero is-medium is-dark">
  <div className="hero-body">
    <p className="title is-1 has-text-centered">
     That's when I built my first prototype called <a className="has-text-link" href="https://www.rainspeedtest.co.za" target="_blank">Rain Speed Test</a>
    </p>
    <div className="has-text-centered">
        <img src="/rain.png"/>
        <p className="help">The above is a great example of a very inconsistent / unstable internet connection.</p>
    </div>
   
    <p className="is-size-3 has-text-centered mt-4">
     By pure chance, the website became extremely popular, getting a few thousand hits a month and I started receiving requests to build a version that's installable on any device with a dashboard they can access from anywhere.
    </p>
    <p className="title is-1 has-text-centered mt-6">
     And that was the birth of <a className="has-text-link" href="https://www.isplogger.com" target="_blank">ISP Logger</a>
    </p>

    <div className="has-text-centered mt-6">
        <Link href="/register"><a className=" is-size-4 has-text-link has-text-weight-bold">Sign up now to start monitoring your internet connection today</a></Link>
    </div>
  </div>
</section>

<section className="hero is-medium is-light">
  <div className="hero-body">
    <p className="is-size-3 has-text-centered mt-6">
    Want to get in touch with me?
    <br/>
    You can find me on <a className="has-text-link" href="https://twitter.com/ronaldlangeveld" target="_blank">Twitter</a> or my personal website, <a className="has-text-link" href="https://www.ronaldlangeveld.com" target="_blank">ronaldlangeveld.com</a>
    </p>
  </div>
</section>
     
<footer className="footer">
  <div className="content has-text-centered">
    <p>
      <strong>ISP Logger</strong> by <a href="https://www.ronaldlangeveld.com" target="_blank">Ronald Langeveld</a>
      <p>Copyright © 2021 ISP Logger</p>
    </p>
  </div>
</footer>
    </>
  );
};



export default AboutComp;
