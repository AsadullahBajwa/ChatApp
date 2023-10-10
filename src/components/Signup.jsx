import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    confirm_password:"",
  });

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
            confirm_password:"",
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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />{" "}
        <br />
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
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
        />{" "}
        <br />
        <button type="submit">Sign Up</button> <br />
        
      </form>
      <Link to={'/login'}>Already have account? Login</Link>
    </div>
  );
};

export default Signup;
