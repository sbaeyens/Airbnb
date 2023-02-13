import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";


function DemoLoginButton() {
  let dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    return dispatch(sessionActions.login("demo@user.io", "password"));
    // .then(closeModal)
    // .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    // });
  };
  return <button onClick={handleSubmit}>Demo User</button>;
}

export default DemoLoginButton;
