import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  { FormButton } from  "./Styled-component/Buttons/Button";

const Signup = () => {
  const navigate = useNavigate();

  const base_url = process.env.REACT_APP_BASE_URL
  const end_point = '/signUp'
  const fullUrl = base_url + end_point

  // maintaining the state of form in component
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // show hide password function
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm_password") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const passwordInputType = showPassword ? "text" : "password";
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";



  // handling the changes in form feild
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Signup successful
        const data = await response.json();
        console.log(data);
        alert(data.message);
        navigate("/login");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      } else {
        // Handle signup error
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-holder auth">
      <div className="background-container">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'><rect fill='#000000' width='1600' height='800' /><g fill-opacity='1'><polygon fill='#220000' points='1600 160 0 460 0 350 1600 50' /><polygon fill='#440000' points='1600 260 0 560 0 450 1600 150' /><polygon fill='#660000' points='1600 360 0 660 0 550 1600 250' /><polygon fill='#880000' points='1600 460 0 760 0 650 1600 350' /><polygon fill='#A00' points='1600 800 0 800 0 750 1600 450' /></g></svg>
      </div>
      <div className="login signup">
        <h2>Sing Up</h2>
        <form className="login-form">
          <div className="textbox">
            <input type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <span className="material-symbols-outlined"> account_circle </span>
          </div>
          <div className="textbox">
            <input type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div className="textbox">
            <input
              type={passwordInputType}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="material-symbols-outlined"> lock </span>
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>

          <div className="textbox">
            <input
              type={confirmPasswordInputType}
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
            <span className="material-symbols-outlined"> lock </span>
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => togglePasswordVisibility("confirm_password")}
            >
              {showConfirmPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          {/* <button type="submit">Sing Up</button> */}
          <FormButton type="submit">Sign Up</FormButton>
          <span>Already have account? <Link to={'/login'}>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
