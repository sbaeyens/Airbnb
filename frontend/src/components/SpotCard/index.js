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

  console.log("spot.id from inside spotcard", spot.id)

    return (
      <div className="spot-card" key={spot.name}>
        <Link to={`/spots/${spot.id}`}>
          <img
            className="spot-card-img"
            src={spot.previewImage}
            alt={spot.name}
          />
        </Link>
        <Link to={`/spots/${spot.id}`}>
          <div className="top-card-info">
            <div>
              {spot.city} , {spot.state}
            </div>
            <div>
              <span className="rating-section">
                <i className="fa-regular fa-star"></i>
                {!spot.avgRating
                  ? "New"
                  : parseFloat(spot.avgRating).toFixed(1)}
              </span>
            </div>
          </div>
        </Link>
        <div className="bottom-card-info">
          <Link to={`/spots/${spot.id}`}>
            <div>
              <span className="price">${spot.price} night</span>
            </div>
          </Link>
          <div className="owner-buttons">
            {isOwner ? (
              <Link to={`/spots/${spot.id}/edit`}>
                <button>Update</button>
              </Link>
            ) : null}
            {isOwner ? (
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot} />}
              />
            ) : null}
          </div>
        </div>
        <Link to={`/spots/${spot.id}`}>
          <div className="lower-card-gap"></div>
        </Link>
      </div>
    );
}

export default SpotCard
