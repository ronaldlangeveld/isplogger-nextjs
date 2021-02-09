import Link from 'next/link';

const GoPro = () => {

    return (
        <div className="notification is-link">
        <div className="content is-medium has-text-centered">
          <p>Thank you for being an early user of <strong>⚡ ISP Logger</strong>.</p>
          <p> The <strong>free</strong> version is limited to the last 7 results.</p>
          <p>To see all your results, export results, use the date filter, remove this banner and much more, please support us by upgrading to a PRO account. 
            <br/>
          It's still fairly basic, but I'm actively making optimising and adding features to the site and I'm hoping we can grow ISP Logger together. Cheers - Ronald  </p>

        </div>
        <div className="has-text-centered">
          <Link href="/upgrade">
            <button className="button is-primary mt-2 has-text-weight-bold">
              Upgrade to Pro for $9 per month
            </button>
          </Link>
        </div>
      </div>
    )
}

export default GoPro;