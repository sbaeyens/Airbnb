import { Link } from "react-router-dom"
import './SpotCard.css'

function SpotCard({spot}) {

    return (
      <Link key={spot.id} to={`spots/${spot.id}`}>
        <div className="spot-card">
          <img
            className="spot-card-img"
            src={spot.previewImage}
            alt={spot.name}
          />
          {/* <div> */}
            <p>{spot.city}</p>
            <p>{spot.price.toFixed(2)}</p>
            <span>
              <i className="fa-regular fa-star"></i>
              {(+spot.avgRating).toFixed(1)}
            </span>
          {/* </div> */}
        </div>
            </Link>
    );
}

export default SpotCard
