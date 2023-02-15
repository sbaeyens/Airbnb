import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./EditSpotForm.css";
import { addNewSpot, addPhotosToSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";

function EditSpotForm() {
  let spotId = useParams().spotId;
  // console.log("spotID from editSpotform", spotId)
  const history = useHistory();
  const dispatch = useDispatch();

  //---GRAB SPOT DATA---//
  const singleSpotObj = useSelector((state) => {
    return state.spots.singleSpot;
  });

  useEffect(() => {
    dispatch(getSingleSpot(spotId));
  }, [dispatch]);

    // console.log("singleSpotObj", singleSpotObj)
    // let singleSpotData = {
    //   country: "",
    //   streetAddress: "",
    //   city: "",
    //   state: "",
    //   latitude: "",
    //   longitude: "",
    //   description: "",
    //   title: "",
    //   price: "",
    //   SpotImages: [
    //     { url: "" },
    //     { url: "" },
    //     { url: "" },
    //     { url: "" },
    //     { url: "" },
    //   ],
    // };
    // if (Object.keys(singleSpotObj).length > 0) {
    //   singleSpotData = { ...singleSpotObj };
    // }
    // console.log("singleSpotData", singleSpotData);

    const [allSpotData, setAllSpotData] = useState({
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      description: "",
      title: "",
      price: "",
      SpotImages: [
        { url: "" },
        { url: "" },
        { url: "" },
        { url: "" },
        { url: "" },
      ],
    });

    useEffect(() => {

        if (singleSpotObj) {
          const inputFiller = {
            ...allSpotData,
            country: singleSpotObj.country,
            city: singleSpotObj.city,
            state: singleSpotObj.state,
          };
          setAllSpotData(inputFiller);
            console.log("allspotData UseEffect@@@@@@@@@@@", allSpotData);
        }
    },[singleSpotObj])

    // useEffect(() => {
    //     let newSpotData = {
    //         ...allSpotData,
    //         // streetAddress: allSpotData.streetAddress
    //     }
    //     setAllSpotData(newSpotData)
    //   console.log("allspotData UseEffect@@@@@@@@@@@", allSpotData);
    // }, []);


  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [photo1, setPhoto1] = useState([]);
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
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
    if (previewPhoto.length === 0) {
      newErrors.previewPhoto = "Preview image is required";
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
    previewPhoto,
  ]);

  // console.log(errors)

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

    let photosArr = [];

    let previewImgObj = {
      url: previewPhoto,
      preview: "true",
    };

    if (photo1) {
      photosArr.push({
        url: photo1,
        preview: "false",
      });
    }
    if (photo2) {
      photosArr.push({
        url: photo2,
        preview: "false",
      });
    }
    if (photo3) {
      photosArr.push({
        url: photo3,
        preview: "false",
      });
    }
    if (photo4) {
      photosArr.push({
        url: photo4,
        preview: "false",
      });
    }

    // for (let i = 0; i < 4; i++) {
    //   if (photo + i) {

    //   }
    // }

    photosArr.push(previewImgObj);
    console.log("photosArr", photosArr);

    let createdSpot = await dispatch(addNewSpot(newSpot));
    console.log("newSpot from inside form clickhandler", newSpot);

    let spotId = createdSpot.id;
    console.log("spotId from inside NewSpotForm clickhandler", spotId);

    if (createdSpot) {
      dispatch(addPhotosToSpot(photosArr, spotId));
    }
    // console.log("images from inside clickhandler", images)

    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`);
    }
  };

    let handleChange = e => {
        const changeSpot = { ...allSpotData, [e.target.name]: e.target.value }
        setAllSpotData(changeSpot)
    }



  return (
    <div className="new-spot-form-div">
      <form className="new-spot-form" onSubmit={handleSubmit}>
        <h2>Edit Your Spot</h2>
        <label>
          Country{" "}
          <span className="error">{hasSubmitted && errors.country}</span>
          <input
            type="text"
            name="country"
            value={allSpotData.country}
            placeholder="Country"
            // onChange={(e) => setAllSpotData(e.target.value)}
            onChange={handleChange}
          />
        </label>
        <label>
          Street Address{" "}
          <span className="error">{hasSubmitted && errors.streetAddress}</span>
          <input
            type="text"
            name="streetAddress"
            value={allSpotData.address}
            placeholder="Street Address"
            onChange={handleChange}
          />
        </label>
        <div className="form-stack">
          <label>
            City <span className="error">{hasSubmitted && errors.city}</span>
            <input
              type="text"
              name="city"
              value={allSpotData.city}
              placeholder="City"
              onChange={handleChange}
            />
          </label>
          <label>
            State <span className="error">{hasSubmitted && errors.state}</span>
            <input
              type="text"
              name="state"
              value={allSpotData.state}
              placeholder="State"
              onChange={handleChange}
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
              value={allSpotData.lat}
              placeholder="Latitude"
              onChange={handleChange}
            />
          </label>
          {/* <div><br /><br />{",     ,     "}</div> */}
          <label>
            Longitude{" "}
            <span className="error">{hasSubmitted && errors.longitude}</span>
            <input
              type="text"
              name="longitude"
              value={allSpotData.lng}
              placeholder="Longitude"
              onChange={handleChange}
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
            onChange={handleChange}
          >
            {allSpotData.description}
          </textarea>
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
            value={allSpotData.name}
            placeholder="Name of your spot"
            onChange={handleChange}
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
            value={allSpotData.price}
            placeholder="Price per night (USD)"
            onChange={handleChange}
          />
        </label>
        <span className="error">{hasSubmitted && errors.price}</span>
        <label>
          <h3>Liven up your spot with photos</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <input
            type="text"
            name="previewPhoto"
            value={allSpotData.SpotImages[0].url}
            placeholder="Preview Image URL"
            onChange={handleChange}
          />
        </label>
        <span className="error">{hasSubmitted && errors.previewPhoto}</span>
        <label>
          <input
            type="text"
            name="photo1"
            value={
              allSpotData.SpotImages.length > 1
                ? allSpotData.SpotImages[1].url
                : ""
            }
            placeholder="Image URL"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="photo2"
            value={
              allSpotData.SpotImages.length > 2
                ? allSpotData.SpotImages[2].url
                : ""
            }
            placeholder="Image URL"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="photo3"
            value={
              allSpotData.SpotImages.length > 3
                ? allSpotData.SpotImages[3].url
                : ""
            }
            placeholder="Image URL"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="photo4"
            value={
              allSpotData.SpotImages.length > 4
                ? allSpotData.SpotImages[4].url
                : ""
            }
            placeholder="Image URL"
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="submit-button" type="submit">
          Update Your Spot
        </button>
      </form>
    </div>
  );
}

export default EditSpotForm;
