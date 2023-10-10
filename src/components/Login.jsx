import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate()

    // const base_url = process.env.REACT_APP_BASE_URL
    const base_url ="http://127.0.0.1:8000"
    const end_point = '/newLogin'
    const fullUrl = base_url + end_point

    console.log(fullUrl)

  // maintaining the state of form in component
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handling the changes in form feild
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  var token=null;

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
        token=data.data[0]['token'];
        localStorage.setItem('token',token)
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
    <div
    style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "skyblue",
        alignItems: "center",
        border: "1px solid black",
        padding: "20px",
        maxWidth: "35%", // Adjust this value to control the maximum width
        margin: "10% auto", // Center the div horizontally within its parent
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />{" "}
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to={`/forgot-pass/${token}`}>Forgot password</Link>
    </div>
  );
};

export default Login;
