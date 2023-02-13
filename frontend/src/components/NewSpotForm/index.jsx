import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './NewSpotForm.css'

function NewSpotForm() {

      const history = useHistory();

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
    const [photo, setPhoto] = useState("");

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
            newErrors.description =
              "Description needs a minimum of 30 characters";
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
      }, [country, streetAddress, city, state, latitude, longitude, description,title, price, previewPhoto]);

      // console.log(errors)

      const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
          country,
        });

        history.push("/");
      };

    return (
      <div className="new-spot-form-div">
        <form className="new-spot-form" onSubmit={handleSubmit}>
          <h2>Create a new Spot</h2>
          <label>
            Country{" "}
            <span className="error">
              {errors.country ? errors.country : null}
            </span>
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
            <span className="error">
              {errors.streetAddress ? errors.streetAddress : null}
            </span>
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
              City{" "}
              <span className="error">{errors.city ? errors.city : null}</span>
              <input
                type="text"
                name="city"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label>
              State{" "}
              <span className="error">
                {errors.state ? errors.state : null}
              </span>
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
              <span className="error">
                {errors.latitude ? errors.latitude : null}
              </span>
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
              <span className="error">
                {errors.longitude ? errors.longitude : null}
              </span>
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
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </textarea>
          </label>
          <p>
            <span className="error">
              {errors.description ? errors.description : <br></br>}{" "}
            </span>
          </p>
          <label>
            <h3>Create a title for your spot</h3>
            <p>
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </p>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Name of your spot"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <span className="error">
            {errors.title ? errors.title : <br></br>}{" "}
          </span>
          <label>
            <h3>Set a base price for your spot</h3>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Price per night (USD)"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <span className="error">
            {errors.price ? errors.price : <br></br>}{" "}
          </span>
          <label>
            <h3>Liven up your spot with photos</h3>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <input
              type="text"
              name="previewPhoto"
              value={previewPhoto}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewPhoto(e.target.value)}
            />
          </label>
          <span className="error">
            {errors.previewPhoto ? errors.previewPhoto : <br></br>}{" "}
          </span>
          <label>
            <input
              type="text"
              name="photo"
              value={photo}
              placeholder="Image URL"
              onChange={(e) => setPhoto(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              name="photo"
              value={photo}
              placeholder="Image URL"
              onChange={(e) => setPhoto(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              name="photo"
              value={photo}
              placeholder="Image URL"
              onChange={(e) => setPhoto(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              name="photo"
              value={photo}
              placeholder="Image URL"
              onChange={(e) => setPhoto(e.target.value)}
            />
          </label>
          <br />
          <button className="submit-button" type="submit">
            Create Spot
          </button>
        </form>
      </div>
    );
}

export default NewSpotForm
