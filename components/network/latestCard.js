import moment from 'moment';

const LatestCard = ({data, units}) => {

    console.log(data);

    return (
       <>
       <h2 className="title has-text-centered">Network Summary</h2>
               <nav className="level mt-4 is-fullwidth">
    <div className="level-item has-text-centered">
        <div>
            <p className="heading">Total Tests</p>
            <p className="title is-3">{data.tests}</p>
        </div>
    </div>
    <div className="level-item has-text-centered">
        <div>
            <p className="heading">Avg Download</p>
            <p className="title is-3">{parseFloat(data.avg_down/units.conversion).toFixed(2)} {units.unit}</p>
        </div>
    </div>
    <div className="level-item has-text-centered">
        <div>
            <p className="heading">Avg Upload</p>
            <p className="title is-3 ">{parseFloat(data.avg_up/units.conversion).toFixed(2)} {units.unit}</p>
        </div>
    </div>
    <div className="level-item has-text-centered">
        <div>
            <p className="heading">Avg Latency</p>
            <p className="title is-3 ">{parseFloat(data.ping_avg).toFixed(0)} ms</p>
        </div>
    </div>
</nav>
       </>
    )
}

export default LatestCard;