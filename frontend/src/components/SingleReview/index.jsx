import './SingleReview.css'
import DeleteReview from "../DeleteReview"
import OpenModalButton from "../OpenModalButton";


function SingleReview({ review, sessionUser }) {
  let date = review.createdAt
  let dateParsed = Date.parse(date);
  let dateobj = new Date(dateParsed)
  let newdate = dateobj.toString()
  let dateArr = newdate.split(' ')
  // let newDate = dateobj.getFullYear() + "/" + (dateobj.getMonth() + 1);
  // console.log("newDate", newDate)
  let dateMonth = dateArr[1]
  let dateDay = dateArr [2]
  let dateYear = dateArr[3]

  let isSessionReview = false
  //check if current session is owner of review
  if (sessionUser.id === review.userId) isSessionReview = true


    if (!review) return null
    return (
      <div className="single-review">
        <h3 className="review-text">{review.User.firstName}</h3>
        <h4 className="review-text date">{`${dateMonth}, ${dateYear}`}</h4>
        <p className="review-text">{review.review}</p>
        <div className="owner-buttons">
          {isSessionReview ? (
            <OpenModalButton
              classAttribute={"submit-button-card"}
              buttonText="Delete"
              modalComponent={<DeleteReview review={review} />}
            />
          ) : null}
        </div>
      </div>
    );
}

export default SingleReview
