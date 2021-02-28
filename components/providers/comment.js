import moment from "moment";

const Comment = ({Data}) => {


    return (
        <article className="media">
        <figure className="media-left">
          <div className="image is-64x64 profile-pic-comments" style={{backgroundImage: `url(${Data.user.avatar !== null ? Data.user.avatar.secure_url : '/ufo.jpg'})`}}>
            {/* <img src={Data.user.avatar.secure_url || '/ufo.jpg'} /> */}
          </div>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>@{Data.user.username}</strong>
              <small className="ml-2">{moment(Data.created_at).fromNow()}</small>
              <br />
              {Data.content}
            </p>
          </div>
        </div>
        {/* <div className="media-right">
          <button className="delete"></button>
        </div> */}
      </article>
    )
}

export default Comment;