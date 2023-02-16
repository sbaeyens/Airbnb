import './SingleReview.css'

function SingleReview({ review }) {
  let date = review.createdAt
  let dateParsed = Date.parse(date);
  console.log("date parsed",dateParsed );
  let dateobj = new Date(dateParsed)
  console.log("date string", dateobj);
  let newdate = dateobj.toString()
  console.log("newdate", newdate)
  let dateArr = newdate.split(' ')
  console.log("dateArr", dateArr)
  // let newDate = dateobj.getFullYear() + "/" + (dateobj.getMonth() + 1);
  // console.log("newDate", newDate)
  let dateMonth = dateArr[1]
  let dateDay = dateArr [2]
  let dateYear = dateArr[3]

    console.log("review from single review component", review)
    if (!review) return null
    console.log("review from Single Review component", review)
    return (
      <div className="single-review">
        <h3>{review.User.firstName}</h3>
        <h4>{`${dateMonth} ${dateYear}`}</h4>
            <p>{review.review}</p>
      </div>
    );
}

export default SingleReview
