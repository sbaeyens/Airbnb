import './SingleReview.css'

function SingleReview({review}) {
    console.log("review from single review component", review)
    if (!review) return null
    console.log("review from Single Review component", review)
    return (
      <div className="single-review">
        <h3>{review.User.firstName}</h3>
            <h4>{review.createdAt}</h4>
            <p>{review.review}</p>
      </div>
    );
}

export default SingleReview
