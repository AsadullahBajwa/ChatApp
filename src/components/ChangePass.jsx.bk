import React, { useState } from "react";
import { Link } from "react-router-dom";

const ChangePass = () => {
  // maintaining the state of form in component
  const [formData, setFormData] = useState({
    // username: "",
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

    try {
      const response = await fetch("http://127.0.0.1:8000/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ChangePass successful
        const data = await response.json();
        console.log(data);
        alert(data.message);
        setFormData({
            username: "",
            email: "",
            password: "",
            confirm_password:"",
          });
      } else {
        // Handle ChangePass error
        console.error("ChangePass failed");
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
      <h2>ChangePass</h2>
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
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
        />{" "}
        <br />
        <button type="submit">Update Password</button> <br />
        
      </form>
      <Link to={'/login'}>Already have account? Login</Link>
    </div>
  );
};

export default ChangePass;
