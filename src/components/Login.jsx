import '../assets/css/styles.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  const base_url = process.env.REACT_APP_BASE_URL
  // console.log(base_url)
  const end_point = '/newLogin'
  const fullUrl = base_url + end_point

  // console.log(fullUrl)

  // maintaining the state of form in component
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // show hide password function
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordInputType = showPassword ? "text" : "password";

  // handling the changes in form feild
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  var token = null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful
        <h1>Login successful</h1>
        const data = await response.json();
        console.log(data);
        alert(data.message);
        setFormData({
          email: "",
          password: "",
        });
        token = data.data[0]['token'];
        localStorage.setItem('token', token)
        // console.log(token)
        navigate('/home');
      } else {
        // Handle Login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleForgotPassword = () => {
  //   navigate("/forgot-pass", {
  //     pathname: `/forgot-pass/${encodeURIComponent(response.token)}`,
  //   });
  // };

  return (
    <div className="form-holder auth">
      <div className="login">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="material-symbols-outlined"> account_circle </span>
          </div>
          <div className="textbox">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="material-symbols-outlined"> lock </span>
            <span
              className="material-symbols-outlined password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <button type="submit">LOGIN</button>
          <Link to={`/forgot-pass/${token}`}>Forgot your credentials?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
