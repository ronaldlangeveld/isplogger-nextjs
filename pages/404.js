import Link from 'next/link';

const NotFound = () => {

    return (
        <>
        <section className="hero is-light is-fullheight">
  <div className="hero-body">
    <div className="container">
    <p className="title is-1">
    ⚡ ISP Logger
      </p>
      <p className="title">
        Oops, something went wrong.... 
      </p>
      <p className="subtitle mt-3 has-text-link">
        <Link href="/">Let's go back home instead</Link>
      </p>
    </div>
  </div>
</section>
        </>
    )
}
export default NotFound