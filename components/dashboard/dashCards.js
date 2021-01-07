import Link from "next/link";

const Card = ({ data }) => {
  return (
    <div className="card mt-2">
      <div className="card-content">
        <div className="level card_header">
          <div className="level-left">
            <div className="level-item has-text-centered">
              <div>
                <p className="title is-5">{data.name}</p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link href={`/network/${data.id}`}>
                <a className="button is-primary is-size-7">Analytics</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Card;
