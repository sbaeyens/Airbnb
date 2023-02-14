import { Link } from "react-router-dom"
import './SpotCard.css'

function SpotCard({spot}) {

    return (
      <Link key={spot.id} to={`spots/${spot.id}`}>
        <div className="spot-card" key={spot.name}>
          <img
            className="spot-card-img"
            src={spot.previewImage}
            alt={spot.name}
          />
          {/* <div> */}
            <p>{spot.city}</p>
            <p>{spot.price}</p>
            <span>
              <i className="fa-regular fa-star"></i>
              {!spot.avgRating ? "New" : spot.avgRating }
            </span>
          {/* </div> */}
        </div>
            </Link>
    );
}

export default SpotCard
