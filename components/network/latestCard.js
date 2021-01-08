import moment from 'moment';

const LatestCard = ({data, units}) => {

    console.log(data);

    return (
        <div className="card">
            <div className="card-header">
            <p className="card-header-title">Latest Results</p>
            </div>
        <div className="card-content">
        <nav class="level mt-4">
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Done</p>
            <p class="title is-5"><time>{moment(data.created_at).from()}</time></p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Download</p>
            <p class="title is-5">{parseFloat(data.download/units.conversion).toFixed(2)} {units.unit}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Upload</p>
            <p class="title is-5 ">{parseFloat(data.upload/units.conversion).toFixed(2)} {units.unit}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Latency</p>
            <p class="title is-5 ">{parseFloat(data.ping).toFixed(0)} ms</p>
        </div>
    </div>
</nav>
        </div>
        </div>
    )
}

export default LatestCard;