import { Link } from "react-router-dom"
import './SpotCard.css'

function SpotCard({ spot, sessionUser }) {

  if (sessionUser === undefined) sessionUser = 0
  console.log("sessionUser should be 0 now", sessionUser)

  let isOwner = false
    if (spot.ownerId === sessionUser.id) isOwner = true

  console.log("isOwner value", isOwner)

    return (
      <Link key={spot.id} to={`spots/${spot.id}`}>
        <div className="spot-card" key={spot.name}>
          <img
            className="spot-card-img"
            src={spot.previewImage}
            alt={spot.name}
          />
          <div className="top-card-info">
            <div>
              {spot.city} , {spot.state}
            </div>
            <div>
              <span>
                <i className="fa-regular fa-star"></i>
                {!spot.avgRating ? "New" : spot.avgRating}
              </span>
            </div>
          </div>
          <div className="bottom-card-info">
            <div>{spot.price}</div>
            <div className="owner-buttons">
              {isOwner ? <button>Edit</button> : null}
              <button className={isOwner ? "button" : "hidden"}>Delete</button>
            </div>
          </div>
        </div>
      </Link>
    );
}

export default SpotCard
