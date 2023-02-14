import { Link } from "react-router-dom"
import './SpotCard.css'
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal"

function SpotCard({ spot, sessionUser }) {

  if (sessionUser === undefined) sessionUser = 0
  // console.log("sessionUser should be 0 now", sessionUser)

  let isOwner = false
    if (spot.ownerId === sessionUser.id) isOwner = true

  // console.log("isOwner value", isOwner)

    return (
      <div className="spot-card" key={spot.name}>
        <Link to={`spots/${spot.id}`}>
          <img
            className="spot-card-img"
            src={spot.previewImage}
            alt={spot.name}
          />
        </Link>
        <Link to={`spots/${spot.id}`}>
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
        </Link>
        <div className="bottom-card-info">
          <Link  to={`spots/${spot.id}`}>
            <div>{spot.price}</div>
          </Link>
          <div className="owner-buttons">
            {isOwner ? (
              <OpenModalButton
                buttonText="Update"
                modalComponent={<h2>Hello World!</h2>}
              />
            ) : null}
            {isOwner ? (
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot} />}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
}

export default SpotCard
