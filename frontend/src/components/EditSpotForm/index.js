import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./EditSpotForm.css";
import { addNewSpot, addPhotosToSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot, editSpot } from "../../store/spots";

function EditSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  //if not logged in, redirect to home
  let sessionUser;
  sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) history.push(`/`);

  let singleSpotObj= {}
  //---GRAB SPOT DATA---//
  singleSpotObj = useSelector((state) => {
    return state.spots.singleSpot;
  });


  useEffect(() => {
    const fillFeilds = async () => {
     let spotInfo = await dispatch(getSingleSpot(spotId));

      setCountry(spotInfo.country)
      setStreetAddress(spotInfo.address)
      setCity(spotInfo.city)
      setState(spotInfo.state)
      setLatitude(spotInfo.lat);
      setLongitude(spotInfo.lng);
      setDescription(spotInfo.description)
      setTitle(spotInfo.name)
      setPrice(spotInfo.price)
    }
    fillFeilds()
  }, [dispatch]);



  //if not owner of spot, redirect to home

  let isOwner = true;
  if (Object.keys(singleSpotObj).length > 0 && singleSpotObj.ownerId !== sessionUser.id) isOwner = false;
  if (isOwner === false) history.push(`/`);

  let spotId = useParams().spotId;



  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let newErrors = {};

    //errors to push
    if (country.length === 0) {
      newErrors.country = "Country is required";
    }
    if (streetAddress.length === 0) {
      newErrors.streetAddress = "Address is required";
    }
    if (city.length === 0) {
      newErrors.city = "City is required";
    }
    if (state.length === 0) {
      newErrors.state = "State is required";
    }
    if (latitude.length === 0) {
      newErrors.latitude = "Latitude is required";
    }
    if (longitude.length === 0) {
      newErrors.longitude = "Longitude is required";
    }
    if (description.length < 30) {
      newErrors.description = "Description needs a minimum of 30 characters";
    }
    if (title.length === 0) {
      newErrors.title = "Name is required";
    }
    if (price.length === 0) {
      newErrors.price = "Price is required";
    }


    setErrors(newErrors);
  }, [
    country,
    streetAddress,
    city,
    state,
    latitude,
    longitude,
    description,
    title,
    price,
  ]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    //return if errors
    setHasSubmitted(true);
    if (Object.keys(errors).length > 0) return alert(`Cannot Submit`);

    const newSpot = {
      country,
      address: streetAddress,
      city,
      state,
      lat: latitude,
      lng: longitude,
      description,
      name: title,
      price,
    };


    let editedSpot = await dispatch(editSpot(newSpot, spotId));


    if (editedSpot) {
      history.push(`/spots/${spotId}`);
    }
  };


  return (
    <div className="new-spot-form-div">
      <form className="new-spot-form" onSubmit={handleSubmit}>
        <h2>Update Your Spot</h2>
        <label>
          Country{" "}
          <span className="error">{hasSubmitted && errors.country}</span>
          <input
            type="text"
            name="country"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Street Address{" "}
          <span className="error">{hasSubmitted && errors.streetAddress}</span>
          <input
            type="text"
            name="streetAddress"
            value={streetAddress}
            placeholder="Street Address"
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </label>
        <div className="form-stack">
          <label>
            City <span className="error">{hasSubmitted && errors.city}</span>
            <input
              type="text"
              name="city"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            State <span className="error">{hasSubmitted && errors.state}</span>
            <input
              type="text"
              name="state"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <div className="form-stack stack-left">
          <label>
            Latitude{" "}
            <span className="error">{hasSubmitted && errors.latitude}</span>
            <input
              type="text"
              name="latitude"
              value={latitude}
              placeholder="Latitude"
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
          {/* <div><br /><br />{",     ,     "}</div> */}
          <label>
            Longitude{" "}
            <span className="error">{hasSubmitted && errors.longitude}</span>
            <input
              type="text"
              name="longitude"
              value={longitude}
              placeholder="Longitude"
              onChange={(e) => setLongitude(e.target.value)}
            />
          </label>
        </div>
        <label for="description">
          <h3>Describe your place to guests:</h3>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Description"
            value={ description }
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <p>
          <span className="error">{hasSubmitted && errors.description}</span>
        </p>
        <label>
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Name of your spot"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <span className="error">{hasSubmitted && errors.title}</span>
        <label>
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <span className="error">{hasSubmitted && errors.price}</span>

        <br />
        <button className="submit-button" type="submit">
          Update Your Spot
        </button>
      </form>
    </div>
  );
}

export default EditSpotForm;
